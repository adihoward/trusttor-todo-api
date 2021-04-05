import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ClientError } from '../errors/client.error';
import { todoService } from '../services';
import { Todo } from '../types/todo.type';

const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await todoService.getAllTodos();
        res.send(todos);
    } catch (err) {
        next(err);
    }
}

const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors.array().forEach(error => {
                console.error(error);
            });

            throw new ClientError(400, "Request is not valid");
        }

        const newTodo: Todo = {
            description: req.body.description,
            deadlineDate: req.body.deadlineDate
        }

        const createdTodo = await todoService.createTodo(newTodo);
        res.send(createdTodo);;
    } catch (err) {
        next(err);
    }
}

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors.array().forEach(error => {
                console.error(error);
            });

            throw new ClientError(400, "Request is not valid");
        }

        const updatedTodo: Todo = {
            description: req.body.description,
            deadlineDate: req.body.deadlineDate
        }

        const createdTodo = await todoService.updateTodo(req.params.id, updatedTodo);
        res.send("Todo updated successfully");

    } catch (err) {
        next(err);
    }
}

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors.array().forEach(error => {
                console.error(error);
            });

            throw new ClientError(400, "Request is not valid");
        }

        await todoService.deleteTodo(req.params.id);
        res.send("Todo deleted successfully");
        
    } catch (err) {
        next(err);
    }
}

export { getAllTodos, createTodo, updateTodo, deleteTodo };