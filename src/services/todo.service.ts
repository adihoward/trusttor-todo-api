import { IDb } from "../interfaces/IDb.interface";

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
}