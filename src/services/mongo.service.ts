import { Db, MongoClient } from 'mongodb';
import { IDb } from '../interfaces/IDb.interface';

export class MongoService implements IDb {
    private db: Db;

    constructor(mongoConnectionUrl: string) {
        MongoClient.connect(mongoConnectionUrl, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.error(err)
                throw err;
            }

            this.db = client.db(process.env.MONGO_TODO_DB_NAME);
            console.log(`Conneted to ${process.env.MONGO_TODO_DB_NAME} db!`);
        });
    }

    findAll = async (collectionName: string, filterName?: string, filter?: any): Promise<Array<any>> => {
        const collection = this.db.collection(collectionName);
        return await collection.find({ [filterName]: filter }).toArray();
    }

    findOne = async (collectionName: string, identifyFieldName: string, id: string): Promise<any> => {
        const collection = this.db.collection(collectionName);
        return await collection.findOne({ [identifyFieldName]: id });
    };

    insertOne = async (collectionName: string, object: Object) => {
        const collection = this.db.collection(collectionName);
        const result = await collection.insertOne(object);
        return result.ops[0];
    }

    updateArray = async (collectionName: string, id: string, arrayField: string, object: Object) => {
        const collection = this.db.collection(collectionName);
        await collection.updateOne({ "_id": id }, { $push: { [arrayField]: object } });
    }
}