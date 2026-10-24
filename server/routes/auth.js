const express = require('express')
const bcrypt = require('bcryptjs')
const User = require("../models/User")

const router = express.Router()

router.post('/signup', async(req,res)=>{

    try {
        const {name,email,password} = req.body
        if (!name || !email || !password) {
            return res.status(400).json({message:"All fields are required"})
        }
        const existing =await User.findOne({email})
        if(existing)
        {
            return res.status(409).json({message:"Email already registered"})
        }
        const hashed = await bcrypt.hash(password,10)
        User.create({name,email,password:hashed})
        return res.status(201).json({name,email})


    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
}
)
module.exports = router
