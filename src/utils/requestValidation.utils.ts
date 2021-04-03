import { body, param } from "express-validator"

const validateTodoBodyRequest = () => {
    return [
        body('description').isString(),
        body('deadlineDate').isString()
    ]
}

export {validateTodoBodyRequest};

