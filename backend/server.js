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
    //password : "password",
    password : "naveen10@mysql",
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
        if(err){
            console.log(err);
        }
    });
});

//post wishList
app.post('/api/addToWishList', (req,res)=>{
    const productNo = req.body.productNo;
    const accountNo = req.body.accountNo;
    console.log(productNo,accountNo);
    db.query("INSERT INTO wish_list(account_no, product_no) VALUE (?,?);",[accountNo ,productNo], (err, result)=>{
        if(err){
        console.log(err);
        }
    });
});

//Get wish List
app.post('/api/getWishList', (req,res)=>{
    const accountNo = req.body.accountNo;
    db.query("select distinct * from products inner join wish_list on products.product_no = wish_list.product_no where wish_list.account_no = ?;",[accountNo], (err, result)=>{
        res.send(result);
        if(err){
        console.log(err);
        }
    });
})

let buyNowProd;
//Buy Now
app.post('/api/buyNow', (req, res)=>{
    buyNowProd = req.body.productNo;
});

//get Buy Now product
app.get('/api/getBuyNowProd', (req, res)=>{
    db.query("SELECT * FROM ecommerce.products where product_no = ?;",[buyNowProd], (err, result) =>{
        res.send(result);
        console.log(result);
    });
});

//Get All Products
app.get('/api/getAllProd', (req, res)=>{
    db.query("SELECT * FROM ecommerce.products;", (err, result) =>{
        res.send(result);
    });
});

//Get products based on category no
app.post('/api/getCatProd', (req, res)=>{
    const categoryNo = req.body.categoryNo;
    db.query("SELECT * FROM ecommerce.products where category_no = ?;",[categoryNo], (err, result) =>{
        res.send(result);
    });
});

//Get Products based on account no
app.post('/api/getProd', (req,res) =>{
    const accountNo = req.body.accountNo;
    db.query("SELECT * FROM ecommerce.products where account_no =?",[accountNo], (err,result) =>{
        res.send(result);
        console.log(result,accountNo);
    });
});

//add Quantity
app.post('/api/addQty', (req, res)=>{
    const productNo = req.body.productNo;
    db.query("UPDATE ecommerce.products SET quantity=quantity+1 WHERE product_no=?;",[productNo], (err, result)=>{
        console.log(err,result);
        //res.send(err);
    });

});

//subract Quantity
app.post('/api/subQty', (req,res) =>{
    const productNo = req.body.productNo;
    db.query("UPDATE ecommerce.products SET quantity=quantity-1 WHERE product_no=?;",[productNo], (err, result)=>{
        console.log(err,result);
        //res.send(err);
    });
})

//add Product 
app.post('/api/addProd',(req,res) =>{
    
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const quantity = req.body.quantity;
    const categoryNo = req.body.categoryNo;
    const accountNo = req.body.accountNo;
    //console.log(accountNo);
    
    const sqlInsert = "INSERT INTO products (product_name, product_price, quantity, category_no, account_no) VALUES (?,?,?,?,?)";

    db.query(sqlInsert, [productName, productPrice, quantity, categoryNo, accountNo], (err, result) =>{
    
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            //console.log(err);
            res.send(err);
        }
        
    });
});

//registration or Sign Up
app.post('/api/signUp',(req,res) =>{
    
    const userName = req.body.userName;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;
    const dob = req.body.dob;
    const gender = req.body.gender;
    
    const sqlInsert = "INSERT INTO user_accounts(user_name, password, phone, address, dob, gender) VALUES (?,?,?,?,?,?);";

    db.query(sqlInsert, [userName, password, phone, address, dob, gender], (err, result) =>{
    
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(err);
            res.send(err);
        }
        
    });
});

//Reset status
app.get('/api/resetStatus', (req,res) =>{
    status = 0;
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