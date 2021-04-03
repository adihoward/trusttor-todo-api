import {config} from 'dotenv';
config();

import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import { ClientError } from "./errors/client.error";
import todoRouter from "./routes/todo.route";
import { TodoService } from './services/todo.service';
import { MongoService } from './services/mongo.service';

const mongoService = new MongoService(process.env.MONGO_CONNECTION_URL);
const todoService = new TodoService(mongoService);
const app = express()

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => { res.send('Welcome to Todo API'); });
app.use('/todos', todoRouter);

app.use((err, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ClientError) {
        console.log(`Client Error: ${err.message}`)
        res.status(err.statusCode).json(err);
    } else {
        res.status(500).json("There's been a server error");
        console.error(err);
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Todo api listening at http://localhost:${process.env.PORT}`)
});

export {todoService};