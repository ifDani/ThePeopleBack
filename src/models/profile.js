const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SchemaMongo = mongoose.Schema

const ProfileSchema = new SchemaMongo({
  name: String,
  surname:String,
  //TODO:Recordar cmambiar a date aqui y en angular 
  birthday:String,
  picture:String,
  job:String,
  biography:String,
  savedAt:{ type:Date, default: Date.now},
  updatedAt:{type: Date, default:Date.now}
})

const Model = mongoose.model("profile",ProfileSchema)

module.exports = Model
