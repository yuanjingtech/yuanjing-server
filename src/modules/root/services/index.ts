import assert from "assert";
import {MongoClient, ObjectId} from "mongodb";
import moment from "moment";
import config from "../../../config";

type PageInput = {
    first: number;
    after: string;
    last: number;
    before: string;
}
let DATABASE = "yuanjing-web";

export async function getGroupList(args: { page: PageInput }) {
    console.debug(`getGroupList:args=${JSON.stringify(args)}`);
    let {page}: { page: PageInput } = args || {};
    let {first, after, last, before} = page || {};
    console.log(`getArticles:args=${JSON.stringify(args)}`);

    assert(!!first || !!last, "first or last should grate then 0");
    assert(!(!!first && !!last), 'first or last cannot set same time');
    const database = await MongoClient.connect(config.MONGO, {useNewUrlParser: true});
    const query: any = {};
    let sort;
    let limit;
    if (first) {
        sort = {_id: 1};
        limit = first;
        if (after) {
            query._id = {$gt: new ObjectId(after)};

        }
    } else {
        sort = {_id: -1};
        limit = last;
        if (before) {
            query._id = {$lt: new ObjectId(before)};
        }
    }

    const result = await database.db(DATABASE).collection("group").find(query).sort(sort).limit(limit).toArray();
    await database.close();
    return result;
}

type TGroup = {
    _id: ObjectId;
    qrcode: string;
}
export type TAddGroupInput = {
    qrcode: string;
}

export async function addGroup(input: TAddGroupInput): Promise<TGroup | null> {
    console.debug(`addGroup:input=${JSON.stringify(input)}`);
    let {qrcode} = input;
    let database: any;

    try {
        database = await MongoClient.connect(config.MONGO, {useNewUrlParser: true});
        const filter = {qrcode};
        let update: { $set: any } = {
            $set: {
                qrcode,
                expireTime: moment(Date.now()).add(7, 'd').toISOString()
            }
        };
        const response: any = await database.db(DATABASE).collection("group").updateOne(filter, update, {upsert: true});
        const result = await database.db(DATABASE).collection("group").findOne(filter);
        if (result) {
            result.extra = {updatedExisting: response.updatedExisting};
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    } finally {
        if (database) {
            await database.close();
        }
    }
}
