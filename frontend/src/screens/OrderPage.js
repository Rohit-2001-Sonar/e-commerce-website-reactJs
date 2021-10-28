import React, {useState, useEffect} from "react";
import Axios from "axios";
import { useHistory} from "react-router-dom";
import './HomeScreenStyle.css';
import {BrowserRouter, Route} from "react-router-dom";
import './ProductScreenStyle.css';

function OrderPage(){
    const history = useHistory();
    const [products, setProduct] = useState([]);
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [accountNo, setAccountno] = useState('');
    let status =0,product = [];

    useEffect(() =>{
        let unmount = false;
        Axios.get('http://localhost:3001/api/status').then((responce) => {
            status = responce.data[0].status;
            //console.log(status);
            //console.log(responce.data[1]);
            //setAccountno(responce.data[1].userAcc[0].account_no);
            //
            if(status!=1){
                hisLogin();
            }
            else{
                if(!unmount){
                //setAccountno(responce.data[1].userAcc[0].account_no);
                //setUseraccount(responce.data[1].userAcc[0]);
                //console.log(userAccount);
                setAccountno(responce.data[1].userAcc[0].account_no);
                setAddress(responce.data[1].userAcc[0].address);
                //console.log(accountNo);
                fetchData();
                }
            }
        });

        return () =>{
            unmount = true;
        }
    }, []);

    const hisLogin = () =>{
        history.push('/logIn');
    };
    const hisProd = () =>{
        history.push('/');
    };

    const fetchData = () =>{
        Axios.get("/api/getBuyNowProd").then((responce) =>{
          product = responce.data[0];
          setProduct(responce.data[0]);
          
          console.log(responce,responce.data[0].product_no, product.product_no, product.product_name);
        });
    };

    const checkQty = ()=>{
        if(quantity > products.quantity){
            alert("Quantity Exceeded")
        }
        else{
            Axios.post("/api/decQty",{soldQty : quantity, productNo : products.product_no, accountNo : accountNo, totalAmt : products.product_price * quantity, sellerAcc : products.account_no, categoryNo : products.category_no, subcategoryNo : products.subcategory_no, shipping : shipping}).then((responce) =>{
                
              });
            hisProd();
        }
    }

    return(
        <div className="base-container">
            <div className="form">
                {/*<div className="entry">
                <label className="subEntery">Product Name </label>
                <label className="subEntery">Product Price </label>
                <label className="subEntery">Shipping Address </label>
                </div>

                <div className="entry">
                <label className="subEntery">{products.product_name}</label>
                <label className="subEntery">₹{products.product_price}</label>
                <label className="subEntery">{address}</label>
                </div>*/}

                <div className="entry">
                <label className="subEntery">Product Name </label>
                <label className="subEntery">{products.product_name}</label>
                </div>

                <div className="entry">
                <label className="subEntery">Product Price </label>
                <label className="subEntery">₹{products.product_price}</label>
                </div>

                <div className="entry">
                <label className="subEntery">Shipping Address </label>
                <input className="input"  type="text" name="shippingAddr" onChange={(e)=>{
                setShipping(e.target.value);
                
            }} required />
                </div>

                <div className="entry">
                <label htmlform="quantity" >Quantity</label>
                        <input className="input" max={products.quantity}  type="number" name="quantity" onChange={(e)=>{
                setQuantity(e.target.value);
                
            }} required />
            <label>/{products.quantity}</label>
                </div>
                
                <div className="entry">
                    <label className="subEntery">Total Amt </label>
                    <label className="subEntery">{products.product_price * quantity}</label>
                </div>

                <button className="sbtn" onClick={()=>{
                    checkQty();
                }}>Confirm Order</button>

            </div>
            
        </div>
    );
}

export default OrderPage;