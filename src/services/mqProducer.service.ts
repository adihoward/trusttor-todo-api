import amqp, { Channel } from 'amqplib/callback_api';
import { IMessageProducer } from '../interfaces/IMessageProducer.interface';

export class MQProducerService implements IMessageProducer {
    private mqUrl: string;
    private mqQueueName: string;
    private channel: Channel;

    constructor(mqUrl, mqQueueName) {
        this.mqUrl = mqUrl;
        this.mqQueueName = mqQueueName;
    }

    initialize = async () => {
        return new Promise<void>((resolve, reject) => {
            amqp.connect(this.mqUrl, (err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.createChannel((err, channel) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    channel.assertQueue(this.mqQueueName, {
                        durable: true
                    });

                    this.channel = channel;
                    console.log("Connected to mq");
                    resolve();
                });
            });
        })
    }

    sendMessage = (message: string) => {
        this.channel.sendToQueue(this.mqQueueName, Buffer.from(message));
    }
}
