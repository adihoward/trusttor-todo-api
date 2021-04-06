import { AppServices } from "../types/appServices.type";
import { MongoService } from "./mongo.service";
import { MQProducerService } from "./mqProducer.service";
import { NotificationService } from "./notification.service";
import { TodoService } from "./todo.service";

export const initializeServices = async () => {
    try {
        const appServices: Partial<AppServices> = {};
        appServices.mongoService = new MongoService(process.env.MONGO_CONNECTION_URL);
        await appServices.mongoService.initialize();
        appServices.mqProducerService = new MQProducerService(process.env.MQ_URL, process.env.MQ_QUEUE_NAME);
        await appServices.mqProducerService.initialize();
        appServices.notificationService = new NotificationService(appServices.mqProducerService);
        appServices.todoService = new TodoService(appServices.mongoService, appServices.notificationService);

        return appServices as AppServices;
    } catch (err) {
        throw err;
    }
}