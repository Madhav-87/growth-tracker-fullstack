const redisConnection = require('../config/redisConn.js');
const rateLimiter = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');


const limiter=rateLimiter.rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests..!"
    },

    store: new RedisStore({
        sendCommand: (...args) => redisConnection.then((client)=>client.sendCommand(args)).catch((err)=>{throw err}),
    }),
})


module.exports = limiter;