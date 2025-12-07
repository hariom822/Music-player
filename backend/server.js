const express = require('express')
const mongoose = require('mongoose')
// const url = 'mongodb+srv://hariomsharmah822822_db_user/spotify'
const url ="mongodb+srv://hariomsharmah822822_db_user:TfH8I4NfX7FjtxV4@songs.4m71qkt.mongodb.net/spotify"
// const url = 'mongodb+srv://hariomsharmah822822_db_user:TfH8I4NfX7FjtxV4@songs.4m71qkt.mongodb.net/spotify'

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
