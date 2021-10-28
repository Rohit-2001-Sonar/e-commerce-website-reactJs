import React,{useEffect, useState} from "react";
import Axios from 'axios';
import { useHistory} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function WishList(props){
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
        
        Axios.post("/api/getWishList", {accountNo : accountNo}).then((responce) =>{
          setProduct(responce.data);
          console.log(responce.data, accountNo);
        });
        
      };

    const hisLogin = () =>{
        history.push('/logIn');
    };
    const hisOrder = () =>{
        history.push('/orderPage');
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

    const remove = (prodNo) =>{
        Axios.post("/api/addToWishList", {productNo : prodNo, accountNo : accountNo}).then((responce) =>{
            
        })
      };
  
      const buyNow = (prodNo) =>{
        Axios.post("/api/buyNow", {productNo : prodNo}).then(() =>{
            
        });
        hisOrder();
      };

    return(
        <div className="product_list">
            {products.map(product => 
                <div className="product" key={product.product_no}>

                    <div className="prodDetails">
                    <div className="product_title">{product.product_name}</div>
                    <div className="product_price">₹{product.product_price}</div>
                    <div className="product_rating"><ReactStars edit={false} activeColor="Red" size={20} isHalf={true} value={product.rating!=null?product.rating:0}/></div>
                    </div>

                    <div className="qtyDiv">
                    
                    {showQty(product.quantity)}
                    
                    </div>
                    <div className="buttons">
                        <button className="BuyNow" onClick={()=>buyNow(product.product_no)}>Buy Now</button>
                        
                        <button className="AddtoWishList" onClick={()=>remove(product.product_no)}>Remove</button>
                    </div>
           
                </div>
                )
            }
        </div>
    );
}
export default WishList;