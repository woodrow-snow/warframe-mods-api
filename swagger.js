const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: 'Warframe Mods API - CSE341 - Weeks 3 & 4',
    description: 'This warframe mods api was built for cse341 weeks 3 & 4'
    },
  host: 'localhost:3000',
//   schemes: ['http'],
//   servers: [
//     {
//       url: 'https://cse341-contacts-api-n92e.onrender.com'
//     }
//   ]
};

const outputFile = './swagger_output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);