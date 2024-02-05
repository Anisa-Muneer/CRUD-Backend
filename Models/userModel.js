const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Boolean,
        default:false
    },
    Image:{
        type:String,
        default:''
    }
})

const user=mongoose.model('User',userSchema)
module.exports = user