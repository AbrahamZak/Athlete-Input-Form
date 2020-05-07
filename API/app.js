const Express = require("express");
var cors = require('cors')
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://athleteadmin:63oeH5edxKqAKQBz@athletedb-swsd7.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "athletes";
 
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;
 
const PORT = process.env.PORT || 3000;

app.use(cors())

app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("athleteData");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/athleteData", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

 app.get("/athleteData", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
