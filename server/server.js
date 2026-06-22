const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/routes.js');
const dotenv = require('dotenv');
const helmet = require('helmet');
const limiter = require('./middleware/rateLimiter.js');

dotenv.config();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(helmet());
app.use(express.json({ limit: "20mb" }));


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error", success: false });
})


async function startServer() {
   try{
     const ratelimiter = await limiter();
    app.use(ratelimiter);
    app.use('/', router);
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port:${process.env.PORT}`);
    })
   }
   catch(err){
    console.error(err);
    process.exit(1);
   }
}
startServer();