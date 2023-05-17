const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
dotenv.config();

const DB = process.env.DB_URL;
mongoose.connect(DB, { useNewUrlParser: true });

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", UserSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    res.send(user);
  } catch (err) {
    res.status(404).json({ message: "Not exist" });
  }
});
app.post("/users", async (req,res)=>{
     try{
      const user = req.body
      const users = await new Users(user)
      users.save()
      res.send(users)
     }catch(err){
      res.status(500).json({message :err})
     }
})
PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Portda qaldirildi : ${PORT}`);
});
