const mongoose = require("mongoose");
require('dotenv').config({path: __dirname + '/.env.test'})



const atlasURI = process.env.DATABASE_URL;
// console.log(atlasURI) 

const connectToMongo = ()=>{
    mongoose.connect(atlasURI)
    .then(() => console.log("Successfully Connected to cloud db"))
    .catch((e) => console.log("Refused to connect \n" + e))
}

module.exports = connectToMongo;
