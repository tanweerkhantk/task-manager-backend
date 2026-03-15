const router = require("express").Router()
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async(req,res) => {
    
    const {name,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    res.json({
        message: "User register successfully"
    })
    
    })



    router.post("/login", async(req,res) => {

        try {

        const{email,password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({msg: "User not found"})
        }

        const match = await bcrypt.compare(password,user.password)
        if(!match) {
            return res.status(400).json({message:"Invalid password"})
        }
            const token = jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET, 
                {expiresIn:"1d"})
            res.json({token,user})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Server Error"})
            
        }

        
        
    })

    module.exports = router
