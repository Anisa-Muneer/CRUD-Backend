
const express = require('express')
const app = express()
const cors = require('cors')


const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/crud')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:['http://localhost:3000'],
    methods:['Get','POST'],
    Credentials:true
}))

const UserRouter = require('./Routes/UserRoutes')
app.use('/',UserRouter)

const AdminRouter = require('./Routes/AdminRoutes')
app.use('/admin',AdminRouter)

app.listen(3002,()=>{
    console.log("Server running at port 3002");
})
