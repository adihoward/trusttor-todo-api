import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ClientError } from '../errors/client.error';
import { AppRequest } from '../types/appRequset.type';
import { Todo } from '../types/todo.type';
import { getAppServicesFromRequest } from '../utils/getServiceFromRequest.util';

const getAllTodos = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const todos = await getAppServicesFromRequest(req).todoService.getAllTodos();
        res.send(todos);
    } catch (err) {
        next(err);
    }
}

const createTodo = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new ClientError(400, "Request is not valid");
        }

        const newTodo: Todo = {
            description: req.body.description,
            deadlineDate: req.body.deadlineDate
        }

        const createdTodo = await getAppServicesFromRequest(req).todoService.createTodo(newTodo);
        res.send(createdTodo);;
    } catch (err) {
        next(err);
    }
}

const updateTodo = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new ClientError(400, "Request is not valid");
        }

        const updatedTodo: Todo = {
            description: req.body.description,
            deadlineDate: req.body.deadlineDate
        }

        const createdTodo = await getAppServicesFromRequest(req).todoService.updateTodo(req.params.id, updatedTodo);
        res.send("Todo updated successfully");

    } catch (err) {
        next(err);
    }
}

const deleteTodo = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new ClientError(400, "Request is not valid");
        }

        await getAppServicesFromRequest(req).todoService.deleteTodo(req.params.id);
        res.send("Todo deleted successfully");
        
    } catch (err) {
        next(err);
    }
}

export { getAllTodos, createTodo, updateTodo, deleteTodo };