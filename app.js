const express = require('express');
const db=require('./db.js')
const dotenv=require('dotenv')
const morgan=require('morgan')
const createerror=require('http-errors')
const bodyParser = require('body-parser')
const Auth=require('./Routes/AuthRoutes.js')
const bookRoute = require('./Routes/BookRoutes.js');
const app = express();

dotenv.config()
db()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth',Auth)
app.use('/book', bookRoute)
app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            'status':err.status||500,
            'message':err.message
        }
    })
})


app.listen(3000, () => {
    console.log("Server Running on port 3000")
})
