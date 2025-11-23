const express =require("express");
const app=express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');
app.use(methodOverride("_method"));


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


main().then(()=>{
    console.log("connection succesful")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://abruptking_db_user:iOSdP9soEv86KpDV@cluster0.0hs5rs1.mongodb.net/?appName=Cluster0');

  
}

app.listen(8080,()=>{
    console.log("app is listening")
});
app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})
app.post("/chats", async (req, res) => {
  const { sender, receiver, message } = req.body;
  let newChat= new Chat ({
    sender:sender,
    receiver:receiver,
    message:message,
    sentAt: new Date()
  });
  await newChat.save();

res.redirect("/chats");

});
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/chats/:id/edit", async (req, res) => {
  const { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { id, chat});
});
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { sender, receiver, message } = req.body;
  await Chat.findByIdAndUpdate(id, { sender, receiver, message, sentAt: new Date() });
res.redirect("/chats");
});
app.delete("/chats/:id", async (req, res) => {
  const { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});
