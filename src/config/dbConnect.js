import mongoose from "mongoose";

mongoose.connect("mongodb+srv://danielcds:Novasenha66@cluster0.1r1hrmv.mongodb.net/node-express-mongodb");

let db = mongoose.connection;

export default db;