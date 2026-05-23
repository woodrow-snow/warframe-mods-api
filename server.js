/* ***********************************************
 * required Statements
 * *********************************************** */
const express = require('express');
const mongo = require('./database/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger_output.json');


// creating applicaiton
const app = express();

/* ***********************************************
 * Middleware
 * *********************************************** */
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


/* ***********************************************
 * Routes
 * *********************************************** */
app.use('/', require('./routes'));

/* ***********************************************
 * Starting server
 * *********************************************** */
const port = process.env.PORT || 3000;

mongo.initDB((err) => { 
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log('Connected to DB and API started on: ' + port);
        });
    }
});
