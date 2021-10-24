import React, {useState, useEffect} from "react";
import Axios from "axios";
import { useHistory} from "react-router-dom";
import './HomeScreenStyle.css';
import {BrowserRouter, Route} from "react-router-dom";

function BestSeller (props){
    const [products, setProduct] = useState([]);
      const [accountNo, setAccountno] = useState('');
      let status, count = 1;
      const history = useHistory();

      const hisLogin = () =>{
        history.push('/logIn');
    };

    useEffect(()=>{
      let unmount = false;
      Axios.get('http://localhost:3001/api/status', ).then((responce) => {
        status =responce.data[0].status;
        //console.log(status);
        //console.log(responce.data[1]);
        //setAccountno(responce.data[1].userAcc[0].account_no);
        if(status!=1){
          if(!unmount){
            hisLogin();
          }
        }
        else{
          if(!unmount){
            setAccountno(responce.data[1].userAcc[0].account_no);
            //console.log(accountNo);
            fetchData();
          }
        }
    })
    return () =>{
      unmount = true;
  }
    }, []);

    const fetchData = () =>{
        Axios.get("/api/bestSeller").then((responce) =>{
          setProduct(responce.data);
          console.log(responce);
        })
      };


    return(
        <div>
            
            <div className="product_list_home">
                {products.map(product => 
                <div className="product" key={product.product_no}>
                    
                    <div className="prodDetails">
                        <div className="tag"><b>#</b>{count++}</div>
                        <div className="product_title">{product.product_name}</div>
                        <div className="product_price">₹{product.product_price}</div>
                        <div className="product_rating">{product.rating}</div>
                        <div className="product_quantity">Available Qty:= {product.quantity}</div>
                    </div>
                    <div className="buttons">
                        <button className="BuyNow">Buy Now</button>
                        
                        <button className="AddtoWishList">Add To Wishlist</button>
                    </div>
           
                </div>)}
            </div>
        </div>
    );
}

export default BestSeller;