// Import required libraries
const app = require('./app.js')

//Initialize the port number    
const port = process.env.PORT || 5000

//Server running on the port 
app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})

