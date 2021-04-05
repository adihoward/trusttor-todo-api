import { MongoService } from "./mongo.service";
import { NotificationService } from "./notification.service";
import { TodoService } from "./todo.service";

let mongoService;
let notificationService;
let todoService;

export async function initializeServices() {
    mongoService = new MongoService(process.env.MONGO_CONNECTION_URL);
    notificationService = new NotificationService(process.env.MQ_URL, process.env.MQ_QUEUE_NAME);
    notificationService.initialize()
    todoService = new TodoService(mongoService, notificationService);
}

export {mongoService, notificationService, todoService};