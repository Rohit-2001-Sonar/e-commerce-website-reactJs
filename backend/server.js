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

let status = 0, userAcc = [];

app.post('/create',(req, res) =>{
     
});

app.get('/api/products', (req, res) => {

});

//getting account number
app.get('/api/acc_no',(req, res) =>{
    db.query("SELECT count(*) as count FROM user_accounts", (err, result)=>{
        res.send(result);
        
    });
});

//getting product number
app.get('/api/prod_no',(req, res) =>{
    db.query("SELECT COUNT(*) AS count FROM ecommerce.products;", (err, result) =>{
        res.send(result);
    });
});

//add Product 
app.post('/api/addProd',(req,res) =>{
    const productNo = req.body.productNo;
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const quantity = req.body.quantity;
    const categoryNo = req.body.categoryNo;
    const accountNo = req.body.accountNo;
    console.log(accountNo);
    
    const sqlInsert = "INSERT INTO products (product_no, product_name, product_price, quantity, category_no, account_no) VALUES (?,?,?,?,?,?)";

    db.query(sqlInsert, [productNo, productName, productPrice, quantity, categoryNo, accountNo], (err, result) =>{
    
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
        
    });
});

//registration or Sign Up
app.post('/api/signUp',(req,res) =>{
    const accNo = req.body.accNo;
    const userName = req.body.userName;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    const dob = req.body.dob;
    const gender = req.body.gender;
    
    const sqlInsert = "INSERT INTO user_accounts VALUES (?,?,?,?,?,?,?)";

    db.query(sqlInsert, [accNo, userName, password, phone, address, dob, gender], (err, result) =>{
    
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
        
    });
});

//Reset status
app.get('/api/resetStatus', (req,res) =>{
    status = 0;
    userAcc = [];
});

//check status
app.get('/api/status',(req, res) =>{
    res.send([{status},{userAcc}]);
});


//Log In
app.post('/api/logIn', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    
    const sqlInsert = "SELECT * FROM ecommerce.user_accounts where user_name=? and password=?;";
    db.query(
        sqlInsert,[userName,password], (err, result) => {
            if(err){
                res.send({err: err});
            }
            else{
                if(result){
                    res.send(result);
                    userAcc = result;
                    status = 1;
                }
                else{
                    res.send(result);
                }
            }
        }
    );
})

app.listen(3001,() => {console.log("server created")});