/* ***********************************************
 * required Statements
 * *********************************************** */
const express = require('express');
const mongo = require('./database/database');

// creating applicaiton
const app = express();

app.use(express.json());

/* ***********************************************
 * Routes
 * *********************************************** */

/* ***********************************************
 * Starting server
 * *********************************************** */
const port = provess.env.PORT || 3000;

mongo.initDB((err) => { 
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log('API started on: ' + port);
        });
    }
});
