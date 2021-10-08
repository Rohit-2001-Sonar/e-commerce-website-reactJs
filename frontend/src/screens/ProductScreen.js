import React,{useEffect, useState} from "react";
import Axios from 'axios';
import { useHistory} from "react-router-dom";
import './ProductScreenStyle.css';
//import LogIn from './LogIn';

 function ProductScreen(props){
     const history = useHistory();
     const [userAccount, setUseraccount] = useState([]);
     const [accountNo, setAccountno] = useState('');
     let status =0;
     const submit = () =>{
        Axios.get('http://localhost:3001/api/status', ).then((responce) => {
        status = responce.data[0].status;
        console.log(status);
        //console.log(responce.data[1]);
        //setAccountno(responce.data[1].userAcc[0].account_no);
        setUseraccount(responce.data[1].userAcc[0]);
        if(status!=1){
            hisLogin();
        }
        else{
            setAccountno(responce.data[1].userAcc[0].account_no);
            //console.log(accountNo);
        }
    })
    
    };
    submit();

    const hisLogin = () =>{
        history.push('/logIn');
    };

    const hisCreatePost = () =>{
        history.push('/createPost');
    };

    const [products, setProduct] = useState([]);

      const fetchData = () =>{
        Axios.post("/api/getProd", {accountNo : accountNo}).then((responce) =>{
          setProduct(responce.data);
          //console.log(responce);
        })
      };
        //fetchData();

     return (
     <div>
         <div className="sideBar">
             <div className="userDetails">
                 <span>{userAccount.account_no}</span>
                 <span>{userAccount.account_name}</span>
                 <span>{userAccount.phone}</span>
                 <span>{userAccount.address}</span>
                 <span>{userAccount.dob}</span>
                 <span>{userAccount.gender}</span>
                 <button>Your Products</button>
                 <button>Your Orders</button>
                 <button>Wish List</button>
                 <button>Items Sold</button>
             </div>
         </div>
         
                <div className="btn">
                    <button type="button" className="cbtn" onClick={() =>{
                        hisCreatePost();
                    }}>
                        Create New Post
                    </button>
                    <button type="button" className="cbtn" onClick={() =>{
                        fetchData();
                    }}>
                        Product List
                </button>
                </div>
    <div className="product_list">
        {products.map(product => 
            <div className="product" key={product.product_no}>

             <div className="product_title">{product.product_name}</div>
             <div className="product_price">${product.product_price}</div>
             <div className="product_rating">{product.rating}</div>
             <button>+</button>
             <div className="product_quantity">Qty: {product.quantity}</div>
             <button>-</button>
           
         </div>
        )
        }
   </div>
     </div>
     );
 }
 export default ProductScreen;