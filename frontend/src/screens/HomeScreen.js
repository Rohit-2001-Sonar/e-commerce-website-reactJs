import React, {useState, useEffect} from "react";
import Axios from "axios";
import { useHistory} from "react-router-dom";
import './HomeScreenStyle.css';
//import data from "../data";



 function HomeScreen(props){
      const [products, setProduct] = useState([]);
      const [accountNo, setAccountno] = useState('');
      let status;
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
      
     /*const submit = () =>{
        Axios.get('http://localhost:3001/api/status', ).then((responce) => {
        status =responce.data[0].status;
        //console.log(status);
        //console.log(responce.data[1]);
        //setAccountno(responce.data[1].userAcc[0].account_no);
        if(status!=1){
            hisLogin();
        }
        else{
            setAccountno(responce.data[1].userAcc[0].account_no);
            //console.log(accountNo);
        }
    })
    return;
    };
    submit();*/
    
      const fetchData = () =>{
        Axios.get("/api/getAllProd").then((responce) =>{
          setProduct(responce.data);
          console.log(responce);
        })
      };
        //fetchData();

      return (<div className="home">
        
        <div className="categories">
          <div className="category">Best Seller</div>
          <div className="category">Electronics</div>
          <div className="category">Home Appliances</div>
          <div className="category">Pantry</div>
          <div className="category">Toys and Games</div>
          <div className="category">Sports and Fitness</div>
          
        </div>
         <div className="product_list_home">
         {products.map(product => 
            <div className="product" key={product.product_no}>
              <div className="prodDetails">
             <div className="product_title">{product.product_name}</div>
             <div className="product_price">${product.product_price}</div>
             <div className="product_rating">{product.rating}</div>
             <div className="product_quantity">Available Qty: {product.quantity}</div>
             </div>
           
         </div>)}
   </div>
   </div>
     );
 }
 export default HomeScreen;