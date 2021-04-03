import { NextFunction, Request, Response, Router } from "express";
import { todoService } from "..";

const todoRouter = Router();

todoRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await todoService.getAllTodos();
        res.send(todos);
    } catch (err) {
        next(err);
    }
});


export default todoRouter;