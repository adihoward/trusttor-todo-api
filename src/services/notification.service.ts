import amqp, { Channel } from 'amqplib/callback_api';
import { json } from 'express';
import { todoService } from '.';
import { INotificationService } from '../interfaces/INotificationService.inteface';
import { MQMessage } from '../types/mqMessage.type';
import { Todo } from '../types/todo.type';

export class NotificationService implements INotificationService {
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

    private sendTodoNoticationTask = (message: MQMessage) => {
        const msgString = JSON.stringify(message);
        this.channel.sendToQueue(this.mqQueueName, Buffer.from(msgString));
    }

    createNewNotification = (todo: Todo) => {
        const message : MQMessage = {
            action: "new",
            todo: todo
        }

        this.sendTodoNoticationTask(message);
    }

    editNotification = (todo: Todo) => {
        const message : MQMessage = {
            action: "edit",
            todo: todo
        }

        this.sendTodoNoticationTask(message);
    }

    cancelNotification = (todo: Todo) => {
        const message : MQMessage = {
            action: "cancel",
            todo: todo
        }

        this.sendTodoNoticationTask(message);
    }

}