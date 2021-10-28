import React, {useState, useEffect} from "react";
import Axios from "axios";
import { useHistory} from "react-router-dom";
import './HomeScreenStyle.css';
import {BrowserRouter, Route} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function BestSeller (props){
    const [products, setProduct] = useState([]);
      const [accountNo, setAccountno] = useState('');
      let status, count = 1, catNo=1;
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
            
          }
        }
    })
    return () =>{
      unmount = true;
  }
    }, []);

    const fetchData = (catNo) =>{
        Axios.post("/api/bestSeller",{categoryNo : catNo}).then((responce) =>{
          setProduct(responce.data);
          console.log(responce);
        })
      };

      const showQty = (quantity) =>{
        if(quantity > 0){
            return(
                <div className="product_quantity">Available Qty: {quantity}</div>
            );
        }
        else{
            return(
                <div className="outofstock">OUT OF STOCK</div>
            );
        }
    }


    return(
        <div className="bestSeller">
            <div className="catgyList">
              <button className="catgybtn" onClick={()=>{fetchData(1)}}>Electronics</button>
              <button className="catgybtn" onClick={()=>{fetchData(2)}}>Home Appliances</button>
              <button className="catgybtn" onClick={()=>{fetchData(3)}}>Kitchen and Dining</button>
              <button className="catgybtn" onClick={()=>{fetchData(4)}}>Toys and Games</button>
              <button className="catgybtn" onClick={()=>{fetchData(5)}}>Sports and fitness</button>
            </div>
            <div className="product_list_best">
                {products.map(product => 
                <div className="product" key={product.product_no}>
                    
                    <div className="prodDetails">
                        <div className="tag"><b>#</b>{count++}</div>
                        <div className="product_title">{product.product_name}</div>
                        <div className="product_price">₹{product.product_price}</div>
                        <div className="product_rating">
                        <ReactStars edit={false} activeColor="Red" size={20} isHalf={true} value={product.rating!=null?product.rating:0}/>
                        </div>
                        
                    </div>
                    <div>
                    {showQty(product.quantity)}
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