const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

let doc;

if (process.env.ENV_TYPE != 'dev') {
     doc = {
          info: {
               title: 'Warframe Mods API - CSE341 - Weeks 3 & 4',
               description: 'This warframe mods api was built for cse341 weeks 3 & 4'
          },
          host: 'warframe-mods-api.onrender.com',
          schemes: ['https'],
          servers: [
               {
                    url: 'https://warframe-mods-api.onrender.com'
               }
          ]
     };
} else {
     doc = {
          info: {
               title: 'Warframe Mods API - CSE341 - Weeks 3 & 4',
               description: 'This warframe mods api was built for cse341 weeks 3 & 4'
          },
          host: 'localhost:3000'
     };
}

const outputFile = './swagger_output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
