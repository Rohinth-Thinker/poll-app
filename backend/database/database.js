
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DB_URI = process.env.DB_URI;
async function connecToDb(dbName) {
    const db = await mongoose.connect(DB_URI, { dbName });
    console.log(`connected to the DB ${dbName}`);
    return db;
}

module.exports = { connecToDb };