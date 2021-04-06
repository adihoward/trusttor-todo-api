import { MongoService } from "../services/mongo.service";
import { MQProducerService } from "../services/mqProducer.service";
import { NotificationService } from "../services/notification.service";
import { TodoService } from "../services/todo.service";

export interface AppServices {
    mongoService: MongoService;
    mqProducerService: MQProducerService;
    notificationService: NotificationService;
    todoService: TodoService;
}