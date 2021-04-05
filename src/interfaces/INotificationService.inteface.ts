import { Todo } from "../types/todo.type";

export interface INotificationService {
    sendTodoNoticationTask: (todo: Todo) => void;
}