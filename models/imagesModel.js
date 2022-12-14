const mongoose = require('mongoose')

const ImagesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Student Name"],
        maxlength:[100,"Name can not Exceed more the 30 charecter"],
        minlength:[4,"please more than 4 charecter"]
    },
   
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    },
    downloadCount:{
        type:Number
    },
    likeCount:{
        type:Number
    },
    category:{
        type:String,
        required:[true, "Please Select category"]
    },
    Date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Images",ImagesSchema);
