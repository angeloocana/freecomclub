import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Schema from './core/graphql/schema';
import GraphQlHttp from 'express-graphql';
import {MongoClient} from 'mongodb';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import * as fs from 'fs';

import {UserApp} from 'ptz-user-app';
import {UserRepository} from 'ptz-user-repository';

var app = express();

//app.get('/', (req, res) => res.send('hello angelo!'));

console.log('starting server');

app.use(express.static('dist/public'));

const MONGO_URL = 'mongodb://localhost:27017/relay',
	PORT = 3000;

(async () => {
    try{
        var db = await MongoClient.connect(MONGO_URL);
        var userApp = new UserApp(new UserRepository(db));
        var schema = Schema(userApp);

        app.use('/graphql', GraphQlHttp({
            schema,
            graphiql: true
        }));

        app.listen(PORT, () => console.log('Listening on port ' + PORT));

        //Generate schema.json
        var json = await graphql(schema, introspectionQuery);
        fs.writeFile('./dist/server/core/api/schema.json', JSON.stringify(json, null, 2), err => {
            if(err) throw err;

            console.log('Json schema created!');
        });

        //API example
        app.get('/data/links', (req, res) => {
            
            db.collection('links').find({}).toArray((err, links)=>{
                if(err) throw err;

                res.json(links);
            });
        });
    }
    catch(e){
        console.log(e);
    }
})();

/*
 * Old way without async await
var db;
MongoClient.connect(MONGO_URL, (err, database) => {
	if(err) throw err;

	db = database;
    
    app.use('/graphql', GraphQlHttp({
        schema: schema(db),
        graphiql: true
    }));

	app.listen(PORT, () => console.log('Listening on port ' + PORT));
});
*/
