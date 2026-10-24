const express = require('express')
const bcrypt = require('bcryptjs')
const User = require("../models/User")
const jwt = require('jsonwebtoken')

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
router.post('/login',async (req,res) => {
    try {
        
        const {email,password} = req.body
        if(!email || ! password)
        {
            return res.status(400).json({message:"Email and password are required"})
        }
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(401).json({message:"Invalid email or password"})
        }
        const check = await bcrypt.compare(password,user.password)
        if(!check)
        {
            return res.status(401).json({message:"Invalid email or password"})
        }
    const token = jwt.sign(
       { id: user._id },
       process.env.JWT_SECRET,
       { expiresIn: '7d' }
     )
     res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })

    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
    
})



module.exports = router
