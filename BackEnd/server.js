const express=require('express');
const app=express();
const cors=require('cors');
const router=require('./router/routes.cjs');
const dotenv=require('dotenv');

dotenv.config();
app.use(cors());
app.use(express.json({limit:"20mb"}));

app.use('/',router);

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port:${process.env.PORT}`);
})