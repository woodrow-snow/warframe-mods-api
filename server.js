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
            console.log('API started on: ' + port);
        });
    }
});
