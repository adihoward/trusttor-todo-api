import amqp, { Channel } from 'amqplib/callback_api';
import { json } from 'express';
import { Todo } from '../types/todo.type';

export class NotificationService {
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
                }

                connection.createChannel((err, channel) => {
                    if (err) {
                        reject(err);
                    }

                    channel.assertQueue(this.mqQueueName, {
                        durable: false
                    });

                    this.channel = channel;
                    resolve();
                });
            });
        })
    }

    sendTodoNoticationTask = (todo: Todo) => {
        const msg = JSON.stringify(todo);
        this.channel.sendToQueue(this.mqQueueName, Buffer.from(msg));
    }

}