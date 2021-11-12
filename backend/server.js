const express = require('express');
//const bodyParser = require('body-parser');
//import bodyParser from 'body-parser';
const cors = require('cors');
//const data = require('./data');
const mysql = require("mysql");
//const recommend = require('collaborative-filter');

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

//Cosine similarity

//Best Seller
app.post('/api/bestSeller', (req, res)=>{
    const categoryNo = req.body.categoryNo;
    db.query("SELECT * FROM (SELECT product_no,category_no,sum(purchased_qty) as sum,avg(buyer_rating) as avgrating FROM ecommerce.purchased_history group by product_no having category_no=? order by sum desc, avgrating desc limit 10) as t inner join products on products.product_no = t.product_no;",[categoryNo], (err, result)=>{
        res.send(result);
    })
});

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

//add rating
app.post('/api/addrating', (req, res)=>{
    const prating= req.body.rating;
    const pNo=req.body.pNo;
    const orderNo=req.body.orderNo;
    //console.log(prating);
    db.query("UPDATE ecommerce.purchased_history SET buyer_rating=? where order_no=?;",[prating, orderNo], (err, result)=>{

    })
    db.query("UPDATE ecommerce.products SET rating=(select avg(purchased_history.buyer_rating) from purchased_history where purchased_history.product_no=?) where products.product_no=?;",[pNo,pNo], (err,result)=>{
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
});

//Remove from wish

app.post('/api/removeWish', (req,res)=>{
    const accountNo = req.body.accountNo;
    const productNo = req.body.productNo;
    db.query("delete from wish_list where account_no=? and product_no=?;",[accountNo, productNo], (err, result)=>{
        console.log(err,accountNo, productNo);
    });
});

//
//let ratings =[];

const recommend = require('D:/react_apps/e-com/node_modules/collaborative-filter/lib/cf_api.js');

let totalProducts, totalBuyers , buyers=[];
let rating = [];
db.query("SELECT count(distinct buyer_account_no) as count FROM ecommerce.purchased_history;",(err, result)=>{
    console.log('totalBuyers'+result[0].count);
    totalBuyers = result[0].count;
});

db.query("SELECT count(*) as count FROM ecommerce.products;",(err, result)=>{
    console.log(result[0].count);
    totalProducts = result[0].count;
});

db.query("SELECT distinct buyer_account_no FROM ecommerce.purchased_history;",(err, result1)=>{
    
    buyers = result1;
    console.log(buyers.size);
    let count = 0;
buyers.forEach(e => {
    
    //console.log(buyers[i]);
    db.query("SELECT *,avg(buyer_rating) as rating FROM ecommerce.purchased_history where purchased_history.buyer_account_no=? group by product_no;",[e.buyer_account_no],(err, result)=>{
        console.log(result);
        count = count + 1;
        //console.log(i);
        if(err){
            console.log(err);
            }
        var rate = [];
        let k=0;
        for(var j=0; j<totalProducts; j++){
            //console.log("k="+k);
            if(typeof(result[k]) !=='undefined' && result[k].product_no == j+1){
                if(result[k].rating >2){
                    rate.push(1);
                }
                else{
                    rate.push(0);
                }
                k = k+1;
            }
            else{
                rate.push(0);
            }
        }
        console.log(rate);
        rating.push(rate);
        console.log(rating);
        if(count === totalBuyers){
            console.log("reached end");
            let finalResult = recommend.cFilter(rating, 2);
   console.log("recommend = ",finalResult);
        }
    });
    //console.log(rating);
});

});

   // if path error change before /node_modules
   /*const recommend = require('D:/react_apps/e-com/node_modules/collaborative-filter/lib/cf_api.js');
 
const result = recommend.cFilter(ratings, 2);
   console.log("recommend = ",result);*/


//Get Recommend
app.post('/api/getRecommend', (req, res)=>{
    const accountNo = req.body.accountNo;
    
    let totalProducts, totalBuyers , buyers=[];
let rating = [];
db.query("SELECT count(distinct buyer_account_no) as count FROM ecommerce.purchased_history;",(err, result)=>{
    console.log('totalBuyers'+result[0].count);
    totalBuyers = result[0].count;
});

db.query("SELECT count(*) as count FROM ecommerce.products;",(err, result)=>{
    console.log(result[0].count);
    totalProducts = result[0].count;
});

db.query("SELECT distinct buyer_account_no FROM ecommerce.purchased_history;",(err, result1)=>{
    let userIndex=-1, c=0;
    result1.forEach(e => {
        if(accountNo == e.buyer_account_no){
            userIndex = c
        }
        c=c+1;
    });
    if(userIndex==-1){
        res.send([]);
    }
    else{
    buyers = result1;
    console.log(buyers.size);
    let count = 0;
buyers.forEach(e => {
    
    //console.log(buyers[i]);
    db.query("SELECT *,avg(buyer_rating) as rating FROM ecommerce.purchased_history where purchased_history.buyer_account_no=? group by product_no order by product_no;",[e.buyer_account_no],(err, result)=>{
        console.log(result);
        count = count + 1;
        //console.log(i);
        if(err){
            console.log(err);
            }
        var rate = [];
        let k=0;
        for(var j=0; j<totalProducts; j++){
            //console.log("k="+k);
            if(typeof(result[k]) !='undefined' && result[k].product_no == j+1){
                console.log("k="+k);
                if(result[k].rating >2){
                    rate.push(1);
                    console.log("high");
                }
                else{
                    rate.push(0);
                }
                k = k+1;
            }
            else{
                rate.push(0);
                console.log("low"+typeof(result[k]));
            }
        }
        console.log(rate);
        rating.push(rate);
        console.log(rating);
        if(count === totalBuyers){
            console.log("reached end");
            let finalResult = recommend.cFilter(rating, userIndex);
   console.log("recommend == ",finalResult);
            let prodArr=[];
        db.query("SELECT * FROM ecommerce.products;", (err, result)=>{
            result.forEach(e => {
                for(var s=0; s<finalResult.length;s++){
                if(e.product_no == finalResult[s]){
                    prodArr.push(e);
                }
            }
            });
            res.send(prodArr);
            console.log(prodArr);
        });
        }
    });
    //console.log(rating);
});
    }
});

    
});

//Get Your Orders
app.post('/api/getYourOrders', (req, res)=>{
    const accountNo = req.body.accountNo;
    db.query("select * from products inner join purchased_history on products.product_no = purchased_history.product_no where purchased_history.buyer_account_no = ?;",[accountNo], (err, result)=>{
        res.send(result);
        if(err){
        console.log(err);
        }
    });
});

//Get Products Sold
app.post('/api/getProductsSold', (req, res)=>{
    const accountNo = req.body.accountNo;
    db.query("select * from products inner join purchased_history on products.product_no = purchased_history.product_no where purchased_history.seller_account_no = ?;",[accountNo], (err, result)=>{
        res.send(result);
        if(err){
        console.log(err);
        }
    });
});

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

//Get products based on category no
app.post('/api/getCatProdAZ', (req, res)=>{
    const categoryNo = req.body.categoryNo;
    db.query("SELECT * FROM ecommerce.products where category_no = ? order by product_name asc;",[categoryNo], (err, result) =>{
        res.send(result);
    });
});

//Get products based on caetgory sorted h-l
app.post('/api/getCatProdSorted', (req, res)=>{
    const categoryNo = req.body.categoryNo;
    db.query("SELECT * FROM ecommerce.products where category_no = ? order by product_price desc;",[categoryNo], (err, result) =>{
        res.send(result);
    });
});

//Get products based on caetgory sorted l-h
app.post('/api/getCatProdSortedlh', (req, res)=>{
    const categoryNo = req.body.categoryNo;
    db.query("SELECT * FROM ecommerce.products where category_no = ? order by product_price asc;",[categoryNo], (err, result) =>{
        res.send(result);
    });
});

//Get products based on caetgory sorted Rating
app.post('/api/getCatProdRating', (req, res)=>{
    const categoryNo = req.body.categoryNo;
    db.query("SELECT * FROM ecommerce.products where category_no = ? order by rating desc;",[categoryNo], (err, result) =>{
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
app.post('/api/addStock', (req, res)=>{
    const productNo = req.body.productNo;
    const stock = req.body.stock;

    db.query("UPDATE ecommerce.products SET quantity=quantity+? WHERE product_no=?;",[stock, productNo], (err, result)=>{
        console.log(err,result);
        //res.send(err);
    });

});

//Decrease Quantity
app.post('/api/decQty', (req,res) =>{
    const productNo = req.body.productNo;
    const soldQty = req.body.soldQty;
    const accountNo = req.body.accountNo;
    const totalAmt = req.body.totalAmt;
    const sellerAcc = req.body.sellerAcc;
    const categoryNo = req.body.categoryNo;
    const subcategoryNo = req.body.subcategoryNo;
    const shipping = req.body.shipping;
    db.query("UPDATE ecommerce.products SET quantity=quantity-? WHERE product_no=?;",[soldQty, productNo], (err, result)=>{
        console.log(err,result);
        //res.send(err);
    });

    db.query("INSERT INTO purchased_history(buyer_account_no, product_no, purchased_qty, total_amt, seller_account_no, category_no, subcategory_no, shipping_address) VALUES (?,?,?,?,?,?,?,?);",[accountNo, productNo, soldQty, totalAmt, sellerAcc, categoryNo, subcategoryNo, shipping], (err, result)=>{
        if(err){
            console.log(err);
        }
    })

})

//Get sub-categories
app.post('/api/getSubcat', (req,res)=>{
    const categoryNo = req.body.categoryNo;
    db.query("SELECT * FROM ecommerce.category where category_no =?",[categoryNo], (err, result)=>{
        res.send(result);
    });
});

//add Product 
app.post('/api/addProd',(req,res) =>{
    
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const quantity = req.body.quantity;
    const categoryNo = req.body.categoryNo;
    const subcategoryNo = req.body.subcategoryNo;
    const accountNo = req.body.accountNo;
    //console.log(accountNo);
    
    const sqlInsert = "INSERT INTO products (product_name, product_price, quantity, category_no, account_no, subcategory_no) VALUES (?,?,?,?,?,?)";

    db.query(sqlInsert, [productName, productPrice, quantity, categoryNo, accountNo, subcategoryNo], (err, result) =>{
    
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
    const addressone = req.body.address1;
    const addresstwo = req.body.address2;
    const dob = req.body.dob;
    const gender = req.body.gender;
    
    const sqlInsert = "INSERT INTO user_accounts(user_name, password, phone, address1,address2, dob, gender) VALUES (?,?,?,?,?,?,?);";

    db.query(sqlInsert, [userName, password, phone, addressone,addresstwo, dob, gender], (err, result) =>{
    
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            
            res.send('1');
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