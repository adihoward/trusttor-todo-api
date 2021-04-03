export interface IDb {
    findAll: (collectionName: string, filterName?: string, filter?: any) => Promise<Array<any>>;
    findOne: (collectionName: string, identifyFieldName: string, id: string) => Promise<any>;
    insertOne: (collectionName: string, object: any) => Promise<any>;
    updateOne: (collectionName: string, id: string, object: any) => Promise<void>;
    deleteOne: (collectionName: string, id: string) => Promise<void>;
}