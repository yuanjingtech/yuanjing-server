import * as mongoose from 'mongoose';

export const ActivitySchema = new mongoose.Schema({
    type: String,
    title: String,
    code: String,
    url: String,
    username: String,
    expire: Date,
});
