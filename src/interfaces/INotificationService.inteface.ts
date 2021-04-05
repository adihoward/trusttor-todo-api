import { Todo } from "../types/todo.type";

export interface INotificationService {
    createNewNotification: (todo: Todo) => void;
    editNotification: (todo: Todo) => void;
    cancelNotification: (todo: Todo) => void;
}