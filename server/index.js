require('dotenv').config();
const express = require('express');
const cors =require('cors')
const mongoose = require('mongoose');
const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/auth",require('./routes/auth'))
const PORT = 4000;

app.get('/',(req,res) =>{
    res.json({message:"FlowForge API is running"})
})
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err.message,"MongoDb not connected"))
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
app.get('/health',(req,res) =>
{
    res.json({message :"Server health is ok.Surver is  running fine"})
}
)
