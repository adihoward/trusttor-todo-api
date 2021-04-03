import { updateTodo } from "../controllers/todo.controller";
import { IDb } from "../interfaces/IDb.interface";
import { Todo } from "../types/todo.type";

export class TodoService {
    private dbService: IDb;

    constructor(dbService: IDb) {
        this.dbService = dbService;
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
}