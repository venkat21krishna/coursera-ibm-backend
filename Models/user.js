const { boolean } = require('@hapi/joi')
const mongoose=require('mongoose')
const review = require('./review')
const { type } = require('os')

const user= new mongoose.Schema({
    username:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    // isadmin: {
    //     type: Boolean,
    // },

})

module.exports=mongoose.model('User', user)