const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes, (req,res) => {
    res.send("Server")
}) 

app.use('/api/tasks', taskRoutes)

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => console.log("MongoDb Connected"))
.catch(err => console.log(err))






app.listen(process.env.PORT, () => {
    console.log(`Server is started ${process.env.PORT}`);
    
}) 