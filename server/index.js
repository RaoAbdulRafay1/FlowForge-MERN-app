const express = require('express');
const cors =require('cors')
const app = express();
app.use(cors())
const PORT = 4000;

app.get('/',(req,res) =>{
    res.json({message:"FlowForge API is running"})
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
app.get('/health',(req,res) =>
{
    res.json({message :"Server health is ok.Surver is  running fine"})
}
)