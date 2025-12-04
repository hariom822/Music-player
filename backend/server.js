const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/spotify'
const cors=require('cors')
const app = express()

const port = 8000
app.use(cors())
mongoose.connect(url)
    .then(() => { console.log("connection is successful") })
    .catch((err) => { console.log("database is not connecting", err )})
 
    const dummay=mongoose.Schema
const singerSchema = new dummay({
  data:dummay.Types.Mixed
});

const Singer = mongoose.model("singups", singerSchema);
app.get("/find", async (req, res) => {
  const list = await Singer.find();
  res.status(200).json(list);
});
app.listen(port, () => {
    console.log(`server is running yas on ${port}`)
})