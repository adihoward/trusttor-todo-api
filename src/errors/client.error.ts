export class ClientError implements Error {
    name: string;
    message: string;
    stack?: string;
    statusCode: number;

    constructor(statusCode: number, msg: string) {
        this.name = "ClientError";
        this.statusCode = statusCode;
        this.message = msg;
    }
}
