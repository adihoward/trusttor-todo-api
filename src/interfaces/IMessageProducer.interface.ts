export interface IMessageProducer {
    sendMessage: (message: string) => void;
}