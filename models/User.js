const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please add you name"]
    },
    email : {
        type : String,
        required : [true,"Please add your email id "],
        unique : [true,"Email ID already taken!"]
    },
    password : {
        type : String,
        required : [true,"Please add password"]
    },
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Task',
    }]
},{
    timestamps : true
})

userSchema.pre('save',async function(next){
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

module.exports = mongoose.model("User",userSchema)