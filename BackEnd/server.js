const express=require('express');
const app=express();
const cors=require('cors');
const router=require('./router/routes.cjs');
const dotenv=require('dotenv');

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/',router);

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port:${port}`);
})