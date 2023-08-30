const mongoose=require('mongoose')

const reviews= new mongoose.Schema({
    review:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
    },
    reviwed_by:{
        type:mongoose.Types.ObjectId,
        ref : 'users'
    },
    // reviwed_book:{
    //     type: mongoose.Types.ObjectId,
    //     ref : 'books'
    // }
})

module.exports = mongoose.model('review', reviews);