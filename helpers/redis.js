const redis = require('redis')
require('dotenv').config()

const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT

const redisClient = redis.createClient({
    host : redisHost,
    port : redisPort
})

redisClient.on('connect', ()=>{
    console.log('Connected successfully!')
})

redisClient.on('error',(err)=>{
    console.log('Redis error', err)
})


module.exports = redisClient