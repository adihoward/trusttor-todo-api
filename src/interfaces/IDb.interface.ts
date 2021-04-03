export interface IDb {
    findAll: (collectionName: string, filterName?: string, filter?: any) => Promise<Array<any>>;
    findOne: (collectionName: string, identifyFieldName: string, id: string) => Promise<any>;
    insertOne: (collectionName: string, object: any) => Promise<any>;
    updateArray: (collectionName: string, id: string, arrayField: string, object: any) => Promise<void>;
}