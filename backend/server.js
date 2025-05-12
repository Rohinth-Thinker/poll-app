
const express = require("express");
const cors = require("cors");
const { connecToDb } = require("./database/database");
const slidesArray = require("./models/slidesArrayModel");

const { app, server, io } = require("./socket/socket");
const userList = require("./models/userListModel");

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Hello");
})

app.get('/slides/all', async (req, res) => {
    const slides = await slidesArray.find();
    res.status(200).json(slides);
})

app.get('/slides/:userId', async (req, res) => {
    const {userId} = req.params;
    const response = await userList.findById(userId).select("slideList").populate("slideList");
    // console.log(response.slideList);
    res.status(200).json(response.slideList);
})


app.get('/options/:participationId', async (req, res) => {
    const { participationId } = req.params;
    const response = await slidesArray.findOne({ participationId }).select("multipleChoice.options");
    const options = response.multipleChoice.options;
    res.status(200).json(options);
})


app.patch('/option/increment', async (req, res) => {

    const { participationId, optionId } = req.body;

    const response = await slidesArray.updateOne(
        {participationId, "multipleChoice.options._id": optionId},
        {
            $inc : {
                "multipleChoice.options.$.optionVote": 1,
                "multipleChoice.totalVote": 1,
            }
        }
    )

    io.emit("vote_incremented", participationId, optionId);
    res.json(response);
})

server.listen(PORT, async () => {
    const db = await connecToDb("mentimeter")
    console.log(`server is listening on PORT ${PORT}`);
})