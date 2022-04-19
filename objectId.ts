import mongoose, { ObjectId } from "mongoose";

const id = new mongoose.Types.ObjectId()

// console.log(id.getTimestamp())
console.log(mongoose.Types.ObjectId.isValid('625e68e2e939d0099e2b90b'))
