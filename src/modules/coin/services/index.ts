import {MongoError, ObjectId} from 'mongodb';
import config from "../../../config";
import {isRedirect} from "node-fetch";

interface ICoin {
    id: ObjectId
    name: String
    amount: Number
}

interface IUserCoinRecord extends ICoin {
    username: String
}

async function findDocuments<T>(db: any, collectionName: String, query = {}): Promise<Array<T>> {
    return new Promise(((resolve, reject) => {
        try {
            db.collection(collectionName).find(query).toArray(function (err: MongoError, docs: T[]) {
                if (err) {
                    reject(err);
                    return
                }
                console.log("Found the following records");
                console.log(docs);
                resolve(docs)
            });
        } catch (e) {
            reject(e)
        }
    }))
}

async function insertDocument<T>(db: any, collectionName: String, data: {}): Promise<T | null> {
    const result: any = await new Promise((resolve1, reject1) => {
        db.collection(collectionName).insertOne(data, function (error: MongoError, r: any) {
            if (r.result.ok) {
                resolve1(r)
            } else {
                reject1(error)
            }
        });
    });
    console.log(`insertDocument:${JSON.stringify(result)}`);
    const id = result.insertedId;
    return new Promise(((resolve, reject) => {
        try {
            findDocuments<T>(db, collectionName, {_id: id}).then(result => {
                if (result.length) {
                    resolve(result[0])
                } else {
                    resolve(null)
                }
            })
        } catch (e) {
            reject(e)
        }
    }))
}

class CoinService {
    async list(query: any): Promise<Array<ICoin>> {
        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(config.MONGO);
        try {
            console.log("Connected successfully to server");
            const db = client.db('yuanjing');
            return await findDocuments<ICoin>(db, "coin_record", query);
        } finally {
            client.close();
        }
    }

    async add(username: String, name: String, amount: Number) {
        console.log(`CoinService.add(username=${username},name=${name},amount=${amount})`);
        const MongoClient = require('mongodb').MongoClient;
        const client = await MongoClient.connect(config.MONGO);
        try {
            console.log("Connected successfully to server");
            const db = client.db('yuanjing');
            return await insertDocument<IUserCoinRecord>(db, "coin_record", {username, name, amount});
        } catch (e) {
            console.error(`${e.message}`, e)
        } finally {
            client.close();
        }
    }
}

export const coinService = new CoinService();
