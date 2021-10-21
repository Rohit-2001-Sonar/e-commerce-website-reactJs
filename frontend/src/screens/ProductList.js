import React, {useState, useEffect} from "react";
import Axios from "axios";
import { useHistory} from "react-router-dom";
import './HomeScreenStyle.css';
import {BrowserRouter, Route} from "react-router-dom";

function ProductList (props){
    const [products, setProduct] = useState([]);
      const [accountNo, setAccountno] = useState('');
      let status;
      const history = useHistory();

      const hisLogin = () =>{
        history.push('/logIn');
      };

      const hisOrder = () =>{
        history.push('/orderPage');
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
            console.log(responce.data[1].userAcc[0].account_no);
            fetchData();
          }
        }
    })
    return () =>{
      unmount = true;
  }
    }, []);

    const fetchData = () =>{
      let categoryNo = props.data;
        Axios.post("/api/getCatProd", {categoryNo: categoryNo}).then((responce) =>{
          setProduct(responce.data);
          console.log(responce.data, props.data, categoryNo);
        })
      };
    const addWishlist = (prodNo) =>{
      Axios.post("/api/addToWishList", {productNo : prodNo, accountNo : accountNo}).then((responce) =>{
          
      })
    };

    const buyNow = (prodNo) =>{
      Axios.post("/api/buyNow", {productNo : prodNo}).then(() =>{
          
      });
      hisOrder();
    };

    return(
        <div>
            <div className="product_list_home">
                {products.map(product => 
                <div className="product" key={product.product_no}>
                    <div className="prodDetails">
                        <div className="product_title">{product.product_name}</div>
                        <div className="product_price">${product.product_price}</div>
                        <div className="product_rating">{product.rating}</div>
                        <div className="product_quantity">Available Qty: {product.quantity}</div>
                    </div>
                    <div className="buttons">
                        <button className="buyNow" onClick={()=>buyNow(product.product_no)}>Buy Now</button>
                        
                        <button className="addWishlist" onClick={()=>addWishlist(product.product_no)} >Add To Wishlist</button>
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default ProductList;