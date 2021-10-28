import React,{useEffect, useState} from "react";
import Axios from 'axios';
import { useHistory} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function YourOrders(props){
    
    const history = useHistory();
     const [quantity, setQuantity] = useState('1');
     //const [accountNo, setAccountno] = useState('');
     let status =0, accountNo;
     let [products, setProduct] = useState([]);

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
                accountNo = responce.data[1].userAcc[0].account_no;
                //console.log(accountNo);
                fetchData();
                }
            }
        });

        return () =>{
            unmount = true;
        }
    }, []);

    const fetchData = () =>{
        Axios.post("/api/getYourOrders", {accountNo : accountNo}).then((responce) =>{
          setProduct(responce.data);
          console.log(responce.data, accountNo);
        });
      };

    const hisLogin = () =>{
        history.push('/logIn');
    };

    const ratingGiven = (rating,orderNo, pno) => {
        Axios.post("/api/addrating", {rating : rating, orderNo : orderNo, pNo : pno}).then((responce) =>{
            
          });
          alert(`Rating Given`);
    };

    const showStar = (tot_rating, rating, orderNo, pno) =>{
        if(rating == null){
            return(
            <ReactStars activeColor="Red" size={20} isHalf={true} onChange={(e) => {ratingGiven(e,orderNo, pno)} }/>
            );
        }
        else{
            return(
            <div className="rating">Rating : {tot_rating} </div>
            );
        }
    }

    return(
        <div className="product_list">
            {products.map(product => 
                <div className="product" key={product.order_no}>
                    
                    <div className="prodDetails">
                    <div className="product_title">{product.product_name}</div>
                    <div className="product_price">₹{product.product_price}</div>
                    <div className="StarRating">
                        
                        {showStar(product.rating, product.buyer_rating, product.order_no, product.product_no)}
                    </div>
                </div>

                    <div className="qtyDiv">
                    
                    <div className="product_quantity">Purchased Qty: {product.purchased_qty}</div>
                    
                    </div>
                    <div>Amt: ₹{product.total_amt}</div>
           
                </div>
                )
            }
        </div>
    );
}
export default YourOrders;