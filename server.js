// const express = require('express')
// const mongoose = require("mongoose")
// const cors = require("cors")
// require("dotenv").config()

// const authRoutes = require("./routes/authRoutes")
// const taskRoutes = require("./routes/taskRoutes")

// const app = express()

// app.use(cors())
// app.use(express.json())

// app.use("/api/auth", authRoutes, (req,res) => {
//     res.send("Server")
// }) 

// app.use('/api/tasks', taskRoutes)

// mongoose.connect(process.env.MONGO_DB_URL)
// .then(() => console.log("MongoDb Connected"))
// .catch(err => console.log(err))






// app.listen(process.env.PORT, () => {
//     console.log(`Server is started ${process.env.PORT}`);
    
// }) 


const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(cors({
    origin: "https://task-manager-frontend-alpha-rust.vercel.app",
    // function (origin, callback){
    //     callback(null, true)
    // },
    // [
    //     "https://task-manager-frontend-alpha-rust.vercel.app"
    // ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

// ALLOW PREFLIGHT REQUESTS
app.options("*", cors())

app.use(express.json())

app.use("/api/auth", authRoutes) 

app.use('/api/tasks', taskRoutes)

app.get("/", (req,res) => {
    res.send("Backend API Working")
})

// mongoose.connect(process.env.MONGO_DB_URL)
// .then(() => console.log("MongoDb Connected"))
// .catch(err => console.log(err))

let isConnected = false
 async function connectDB(){
    if(isConnected) return
    const db = await mongoose.connect(process.env.MONGO_DB_URL)
    isConnected = db.connections[0].readyState
    console.log("MongoDB Connected")
 }

//Important for Varcel

// module.exports = app
module.exports = async(req,res) =>{
    await connectDB()
    return app(req,res)
}






// app.listen(process.env.PORT, () => {
//     console.log(`Server is started ${process.env.PORT}`);
    
// }) 