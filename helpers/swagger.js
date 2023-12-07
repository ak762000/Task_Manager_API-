const swagger_JSdoc = require('swagger-jsdoc')
const swagger_UI = require('swagger-ui-express')

const options = 
{
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Task Manager ',
        version: '1.0.0',
        description: 'Task Manager Api Documentation',
      },  
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
        servers : 
        [
            {
                url : 'http://localhost:5000',
                description : 'Development Server'
            }
        ],

    apis : ['./routes/UserRoutes.js' , './routes/taskRoutes.js']
}

const swaggerSpec = swagger_JSdoc(options)

module.exports = swaggerSpec