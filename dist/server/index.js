var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Schema from './core/graphql/schema';
import GraphQlHttp from 'express-graphql';
import { MongoClient } from 'mongodb';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import * as fs from 'fs';
import { UserApp } from 'ptz-user-app';
import { UserRepository } from 'ptz-user-repository';
var app = express();
console.log('starting server');
app.use(express.static('dist/public'));
const MONGO_URL = 'mongodb://localhost:27017/relay', PORT = 3000;
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        var db = yield MongoClient.connect(MONGO_URL);
        var userApp = new UserApp(new UserRepository(db));
        var schema = Schema(userApp);
        app.use('/graphql', GraphQlHttp({
            schema,
            graphiql: true
        }));
        app.listen(PORT, () => console.log('Listening on port ' + PORT));
        var json = yield graphql(schema, introspectionQuery);
        fs.writeFile('./dist/server/core/api/schema.json', JSON.stringify(json, null, 2), err => {
            if (err)
                throw err;
            console.log('Json schema created!');
        });
        app.get('/data/links', (req, res) => {
            db.collection('links').find({}).toArray((err, links) => {
                if (err)
                    throw err;
                res.json(links);
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}))();
