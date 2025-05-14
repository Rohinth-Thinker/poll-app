
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { connecToDb } = require("./database/database");
const slidesArray = require("./models/slidesArrayModel");

const { app, server, io } = require("./socket/socket");
const router = require("./routes");

const PORT = 3000;

app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.get("/", async (req, res) => {
    res.send("Hello");
})

app.get('/options/:participationId', async (req, res) => {
    const { participationId } = req.params;
    const response = await slidesArray.findOne({ participationId }).select("multipleChoice.options question");
    console.log(response);
    const options = response.multipleChoice.options;
    const question = response.question.label;
    res.status(200).json({options, question});
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