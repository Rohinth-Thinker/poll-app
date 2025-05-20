
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { connecToDb } = require("./database/database");

const { app, server, io } = require("./socket/socket");
const router = require("./routes");
const path = require('path');

const PORT = 3000;
app.use(express.static(path.join(__dirname, '../static')))

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);


app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../static', 'index.html'));
});


server.listen(PORT, async () => {
    const db = await connecToDb("mentimeter")
    console.log(`server is listening on PORT ${PORT}`);
})