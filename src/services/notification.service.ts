import amqp, { Channel } from 'amqplib/callback_api';
import { IMessageProducer } from '../interfaces/IMessageProducer.interface';
import { INotificationService } from '../interfaces/INotificationService.inteface';
import { MQMessage } from '../types/mqMessage.type';
import { Todo } from '../types/todo.type';

export class NotificationService implements INotificationService {
    private messageProducerService: IMessageProducer;

    constructor(messageProducerService: IMessageProducer) {
        this.messageProducerService = messageProducerService;
    }

    private sendTodoNoticationTask = (message: MQMessage) => {
        const msgString = JSON.stringify(message);
        this.messageProducerService.sendMessage(msgString);
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