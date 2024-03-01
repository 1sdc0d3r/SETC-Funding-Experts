require('dotenv').config();

// app.js file.
var express = require('express');
var app = express();
var mysql = require('mysql2');
const cors = require("cors")
app.use(cors())

// 1. Require the connection to the database.
var connection = mysql.createConnection({
    host: "66.198.240.11",
    user: "bluesmo1_root",
    password: "password",
    database: "bluesmo1_Michael"
})
connection.connect((err => {
    if (err) throw err;
    console.log('MySQL Connected');
}));

// 2. Make the GET requests.
app.get('/api', (req, res) => {
    // let sql = 'SELECT * FROM Customer';
    let sql = 'SELECT Email FROM Customer WHERE Email_Active=1';

    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log('get /')
        res.send(result.map(e => e.Email));
    });
});

app.get('/api/text', (req, res) => {
    console.log("get /text")
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    // client.messages
    //     .create({
    //         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    //         from: '+18553380370',
    //         to: '+180169011891'
    //     })
    //     .then(message => console.log(message.sid));
    // res.send("/txt");
})

//todo change 8080 to 0
app.listen(8080, () => {
    // console.log("server data ", server)
    console.log(`Server listening.`);
});
// module.exports = app;
