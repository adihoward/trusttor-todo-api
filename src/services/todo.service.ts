import { ClientError } from "../errors/client.error";
import { IDb } from "../interfaces/IDb.interface";
import { INotificationService } from "../interfaces/INotificationService.inteface";
import { Todo } from "../types/todo.type";

export class TodoService {
    private dbService: IDb;
    private notificationService: INotificationService;

    constructor(dbService: IDb, notificationService: INotificationService) {
        this.dbService = dbService;
        this.notificationService = notificationService;
    }

    getAllTodos = async () => {
        try {
            const todos = await this.dbService.findAll('todos');

            return todos;
        } catch (err) {
            throw err;
        }
    }

    createTodo = async (todo: Todo) => {
        try {
            const createdTodo = await this.dbService.insertOne('todos', todo);

            this.notificationService.sendTodoNoticationTask(createdTodo);
            return createdTodo;
        } catch (err) {
            throw err
        }
    }

    updateTodo = async (id: string, updatedTodo: Todo) => {
        try {
            await this.dbService.updateOne('todos', id, updatedTodo);
        } catch (err) {
            throw err
        }
    }

    deleteTodo = async (id: string) => {
        try {
            await this.dbService.deleteOne('todos', id);
        } catch (err) {
            throw new ClientError(400, "todo id is not valid");
        }
    }


}