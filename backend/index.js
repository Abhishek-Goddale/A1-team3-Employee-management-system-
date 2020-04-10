const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const app = express();

require('dotenv').config();
schema = require('./schema/mongoDBSchema'); 

const mongoose = require('mongoose');

var mongoDB = process.env.mongoDBMLABURL; 
mongoose.connect(mongoDB);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('conneted to MONGODB database');
});


// ****** allow cross-origin requests code START ****** //
app.use(cors()); // uncomment this to enable all CORS and delete cors(corsOptions) in below code
var allowedOrigins = process.env.allowedOrigins.split(',');
// ****** allow cross-origin requests code END ****** //


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false
}));
app.use('/alivetracking', graphqlHTTP({
    schema,
    graphiql: false
}));
app.use('/', (req, res) => res.send("Welcome KLETECH User"));
app.listen(process.env.PORT, () => console.log('KLETECH Server is ready on localhost:' + process.env.GRAPHQLPORT));
