const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articleSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref:'user'},
    title:{type:String,required:true},
    author:{type:String,require:true},
    category:{type:String,required:true},
    content:{type:String,required:true},
    pic_url:{type:String,required:true},
},{timestamps:true})


mongoose.model('article',articleSchema)

const article = mongoose.model('article',articleSchema)

module.exports=article