require('dotenv').config();

// console.log(process.env);
// app.js file.
var express = require('express');
var app = express();
var mysql = require('mysql2');
const cors = require("cors")
// const jwt = require("jsonwebtoken");
// const exec = require("child_process").exec;

app.use(express.json());
app.use(cors());
const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DATABASE
} = process.env;

var connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE
})
// console.log({
//     connection
// });

connection.connect((err => {
    if (err) throw err;
    console.log('MySQL Connected');
}));

app.get('/api', (req, res) => {
    let sql = 'SELECT Email FROM Customer WHERE Contact_Active=1';
    new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result.map(e => e.Email));
        });
        resolve();
    });
});

app.get('/api/text', (req, res) => {
    console.log("get /text")
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
            from: '+18553380370',
            to: '+18016901189'
        })
        .then(message => console.log(message.sid));
    res.send("/txt");
})

// app.get('/api/welcome', function (req, res) {
//     console.log("/welcome");


//     exec("php email-welcome.php", function (error, stdout, stderr) {
//         res.send({
//             error,
//             stdout,
//             stderr
//         });
//     });
// });

app.post('/api', (req, res) => {
    let {
        ip,
        Full_Name,
        Email,
        Phone,
        Comp_Name,
        SETC_ERC,
        Num_W2_Employees,
        Num_SE_Employees,
        Occupation,
        Lead_Source,
        SETCFE_Referral_ID,
        Referrer
    } = req.body;

    if (!req.body) res.send("Invalid body request.");

    SETC_ERC = SETC_ERC === 'yes' ? "SETC" : "ERC";

    if (Referrer && !SETCFE_Referral_ID) SETCFE_Referral_ID = Referrer;

    let sql = `INSERT INTO Customer (IP, Full_Name, Email, Phone, Comp_Name, SETC_ERC, Num_W2_Employees, Num_SE_Employees, Occupation, Lead_Source, SETCFE_Referral_ID) VALUES ('${ip}','${Full_Name}', '${Email}', '${Phone}', '${Comp_Name}', '${SETC_ERC}', '${Num_W2_Employees}', '${Num_SE_Employees}', '${Occupation}', '${Lead_Source}', '${SETCFE_Referral_ID}')`;
    // console.log(sql);

    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Customer added successfully!");
    });
})

//todo change 8080 to 0
app.listen(0, () => {
    // console.log("server data ", server)
    console.log(`Server listening on port...`);
});
// module.exports = app;
