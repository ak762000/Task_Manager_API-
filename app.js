// Import required libraries
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
require('./db.js')
const redis = require('./helpers/redis.js')
const userRoutes = require('./routes/userRoutes.js')
const taskRoutes = require('./routes/taskRoutes.js')
const swagger_UI = require('swagger-ui-express')
const swaggerSpec = require('./helpers/swagger.js')

//Check if redis is connected or not 
if (redis.connect) {
    console.log('Redis client is connected.');
} else {
    console.log('Redis client is not connected.');
}

//Middlewares
app.use(bodyParser.json())//Take input from the client side
app.use('/api/auth',userRoutes)
app.use('/api',taskRoutes)

//Swagger UI
app.use('/api-docs', swagger_UI.serve, swagger_UI.setup(swaggerSpec))

//Test case
app.get('/',(req,res)=>{
    res.status(200).send("TASK MANAGER API")
})


module.exports = app