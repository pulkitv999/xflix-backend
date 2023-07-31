const express = require('express');
const cors = require('cors');

const httpStatus = require('http-status');
const {errorConverter, errorHandler} = require('./middlewares/error')
const ApiError = require('./utils/ApiError');
const routers = require("./routers")
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

// Swagger API options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'XFLIX',
        version: '1.0.0',
        description: 'Video streaming application',
      },
      contact: {
        name: "Crio.do",
        url: "https://www.crio.do/",
        email: "ping@criodo.com",
      },
      servers: [
        {
          url: 'http://localhost:8082',
          description: "Development server" 
        },
      ],
    },
    apis: ['./src/routes/*.js'],
  };
  
const swaggerSpec = swaggerJsDoc(swaggerOptions);
const options = {explorer : true};
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, options))

app.use(express.json());

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({extended: true}));

app.use('/v1', routers);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;