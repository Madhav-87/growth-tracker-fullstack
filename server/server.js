const express=require('express');
const app=express();
const cors=require('cors');
const router=require('./router/routes.js');
const dotenv=require('dotenv');
const helmet =require('helmet');

dotenv.config();
app.use(cors());
app.use(helmet());
app.use(express.json({limit:"20mb"}));


app.use('/',router);

app.use ((err,req,res,next)=>{
    console.log(err.stack);
    res.status(err.status || 500).json({message:err.message || "Internal Server Error", success:false});
})
app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port:${process.env.PORT}`);
})