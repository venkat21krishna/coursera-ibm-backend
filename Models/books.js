const mongoose=require('mongoose')

const books = new mongoose.Schema({
    title:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    author:{
        type:String,
        lowercase:true,
        required:true,
    },
    ISBN:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
    },
    reviews: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          reviewText: String,

        // type : mongoose.Schema.Types.ObjectId, ref : 'review'
        },
      ],
})

module.exports= mongoose.model('Book', books)