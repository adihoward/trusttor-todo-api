import { Router } from "express";
import { createTodo, getAllTodos, updateTodo } from "../controllers/todo.controller";
import { validateTodoBodyRequest } from "../utils/requestValidation.utils";

const todoRouter = Router();

todoRouter.get('/', getAllTodos);
todoRouter.post('/', validateTodoBodyRequest(), createTodo);
todoRouter.put('/:id', validateTodoBodyRequest(), updateTodo);



export default todoRouter;