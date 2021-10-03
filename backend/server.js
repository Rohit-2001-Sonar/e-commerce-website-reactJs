const express = require('express');
//const bodyParser = require('body-parser');
//import bodyParser from 'body-parser';
const cors = require('cors');
//const data = require('./data');
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "password",
    database : "ecommerce",
    
});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/create',(req, res) =>{
     
});

app.get('/api/products', (req, res) => {

});

app.post('/api/signUp',(req,res) =>{
    const userName = req.body.userName;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    const dob = req.body.dob;
    const gender = req.body.gender;
    let count = 0;
    const sqlInsert = "INSERT INTO user_accounts VALUES (?,?,?,?,?,?,?)";
    
    db.query(sqlInsert, [count,userName, password, phone, address, dob, gender], (err, result) =>{
        if(!err)
        {
            count++;
        }
        if(err){
            console.log(err);
        }
        
    });
});

app.listen(3001,() => {console.log("server created")});