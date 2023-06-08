const mongoose = require('mongoose');
const { isUrl } = require('./Methods')
require('dotenv').config();

mongoose.connect(process.env.db_link)
.then(function(db){
    console.log("DB Connection established");
}).catch(function(err){
    console.log(err);
});


const schema = mongoose.Schema({
    longUrl : {
        type : String,
        required : [true, "Empty field url"],
        validate : [isUrl, "Not a valid url"]
    },
    alias : {
        type : String,
        unique : [true, "alias not available try a different one or leave it blank"],
        default : Math.random().toString(36).slice(8)
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    clicks : {
        type : Number,
        default : 0
    }
})


DBModel = mongoose.model('DBModel', schema)

module.exports = DBModel;