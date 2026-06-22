const {RedisStore} = require('rate-limit-redis');
const {createClient}=require('redis');


const redisClient=createClient({
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD,
    socket:{
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT
    }
});
redisClient.on('error',(error)=>{
    console.log("Redis error:"+error);
})
const redisConnection=redisClient.connect().then(()=>redisClient);

module.exports=redisConnection;

