const mongoose=require('mongoose')
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to database")
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports=connect