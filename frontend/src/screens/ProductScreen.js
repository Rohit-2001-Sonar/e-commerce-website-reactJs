import React,{useEffect, useState} from "react";
import Axios from 'axios';
import { useHistory} from "react-router-dom";
import './ProductScreenStyle.css';
import CreatePost from "./CreatePost";
import YourProduct from "./YourProduct";
import WishList from "./WishList";
import YourOrders from "./YourOrders";
import ProductsSold from "./ProductsSold";
import {BrowserRouter, Route} from "react-router-dom";
import {Link } from "react-router-dom";
//import LogIn from './LogIn';

 function ProductScreen(props){
     const history = useHistory();
     const [userAccount, setUseraccount] = useState([]);
     const [accountNo, setAccountno] = useState('');
     let status =0;

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
                setAccountno(responce.data[1].userAcc[0].account_no);
                setUseraccount(responce.data[1].userAcc[0]);
                //console.log(userAccount);
                }
            }
        })
        return () =>{
            unmount = true;
        }
    }, []);


     /*const submit = () =>{
        Axios.get('http://localhost:3001/api/status', ).then((responce) => {
        status = responce.data[0].status;
        //console.log(status);
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
    submit();*/

    const hisLogin = () =>{
        history.push('/logIn');
    };

    const resetStatus = () =>{
        Axios.get('http://localhost:3001/api/resetStatus').then((responce) => {
            
        })
      };

    const hisCreatePost = () =>{
        history.push('/createPost1');
    };

    const [products, setProduct] = useState([]);

      const fetchData = () =>{
        Axios.post("/api/getProd", {accountNo : accountNo}).then((responce) =>{
          setProduct(responce.data);
          console.log(accountNo);
        })
      };
        //fetchData();

     return (
     <div className="bigContainer">
         <BrowserRouter>
         <div className="sideBar">
                <div className="details">
                 <span className="detail"> ACCOUNT NO : {userAccount.account_no}</span>
                 <span className="detail"> USER NAME  : {userAccount.user_name}</span>
                 <span className="detail"> PHONE      : {userAccount.phone}</span>
                 <span className="detail"> HOME ADDRESS   : {userAccount.address1}</span>
                 <span className="detail"> ALT. ADDRESS   : {userAccount.address2}</span>
                 </div>
                 <ul>
                    
                    <li><Link to="/CreatePost">Create New Post</Link></li>
                    <li><Link to="/yourProduct">Your Products</Link></li>
                    
                    <li><Link to="/yourOrders">Your Orders</Link></li>
                    <li><Link to="/wishList">Wishlist</Link></li>
                    <li><Link to="/productsSold">Products Sold</Link></li>
                    
                </ul>
                <button className="lbtn1" onClick={() =>{
              resetStatus();
              hisLogin();
            }}>Log Out</button>
         </div>
         
    <div className="showCase">

        <Route exact path="/yourProduct" component={YourProduct}/>
        <Route exact path="/createPost" component={CreatePost}/>
        <Route exact path="/wishList" component={WishList}/>
        <Route exact path="/yourOrders" component={YourOrders}/>
        <Route exact path="/productsSold" component={ProductsSold}/>
        
    </div> 
    </BrowserRouter>
     </div>
     );
 }
 export default ProductScreen;