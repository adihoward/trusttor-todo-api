import { Router } from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controller";
import { validateTodoBodyRequest } from "../utils/requestValidation.utils";

const todoRouter = Router();

todoRouter.get('/', getAllTodos);
todoRouter.post('/', validateTodoBodyRequest(), createTodo);
todoRouter.put('/:id', validateTodoBodyRequest(), updateTodo);
todoRouter.delete('/:id', deleteTodo);

export default todoRouter;