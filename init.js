const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main().then(()=>{
    console.log("connection succesful")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  
}
const chats = [
    {
      sender: "Alice",
      receiver: "Bob",
      message: "Hey Bob, how are you?",
      sentAt: new Date()
    },
    {
      sender: "Bob",
      receiver: "Alice",
      message: "I'm good, thanks Alice!",
      sentAt: new Date()
    },
    {
      sender: "Charlie",
      receiver: "Alice",
      message: "Hello Alice!",
      sentAt: new Date()
    },
    {
      sender: "Alice",
      receiver: "Charlie",
      message: "Hi Charlie!",
      sentAt: new Date()
    }
  ];
  Chat.insertMany(chats);

