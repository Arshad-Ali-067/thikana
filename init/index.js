
const mongoose = require("mongoose");
const Listing = require("../models/listing.js")
const initData = require("./data.js")

main().then(()=>{
    console.log("connection successful")

}).catch((err)=>{
    console.log(err)
})
  


async function main() {
  await  mongoose.connect('mongodb://127.0.0.1:27017/wanderlust'); // connect to mongoDB // return a promise
}

const initDB = async()=>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({...obj,owner : '6ad66c237a308938d9a9b3ad'}))
await   Listing.insertMany(initData.data);
console.log("data was intialized.")
}

initDB()