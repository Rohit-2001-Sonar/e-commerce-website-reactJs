import React,{useEffect, useState} from "react";
import Axios from 'axios';
import { useHistory} from "react-router-dom";

function YourProduct(props){
    const history = useHistory();
     const [quantity, setQuantity] = useState('1');
     //const [accountNo, setAccountno] = useState('');
     let status =0, accountNo;
     let [products, setProduct] = useState([]);
     const [stock, setStock] = useState('');

     

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
        
        Axios.post("/api/getProd", {accountNo : accountNo}).then((responce) =>{
          setProduct(responce.data);
          //console.log(responce.data, accountNo);
        });
        
      };

    const hisLogin = () =>{
        history.push('/logIn');
    };
    const hisProd = () =>{
        history.push('/productScreen');
    };


    const showQty = (quantity) =>{
        if(quantity > 0){
            return(
                <div className="product_quantity">Qty: {quantity}</div>
            );
        }
        else{
            return(
                <div className="outofstock">OUT OF STOCK</div>
            );
        }
    }

    const addStock = (pno) =>{
        
        Axios.post("/api/addStock", {stock : stock, productNo : pno }).then((responce) =>{
          
          //console.log(responce.data, accountNo);
        });
        alert("Stock updated successfully")
        hisProd();
        
      };

    return(
        <div className="product_list">
            {products.map(product => 
                <div className="product" key={product.product_no}>

                    <div className="prodDetails">
                    <div className="product_title">{product.product_name}</div>
                    <div className="product_price">₹{product.product_price}</div>
                    <div className="product_rating">Rating : {product.rating}</div>
                    </div>
                    
                    <div className="qtyDiv">
                    
                    {showQty(product.quantity)}
                    
                    </div>
                    <div className="addStock">
                    <input type="number" className="stock" onChange={(e)=>{
                        setStock(e.target.value);
                    }}/>
                    <button className="addStockbtn" onClick={()=>{
                        addStock(product.product_no);
                    }}>ADD STOCK</button>
                    </div>

                </div>
                )
            }
        </div>
    );
}
export default YourProduct;