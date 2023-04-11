import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_ATLAS_KEY);

let db = mongoose.connection;

export default db;