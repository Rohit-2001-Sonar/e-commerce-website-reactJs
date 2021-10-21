import React, {useState, useEffect} from "react";
import Axios from "axios";
import { useHistory} from "react-router-dom";
import './HomeScreenStyle.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Link } from "react-router-dom";
import Recommendation from "./Recommendation";
import OrderPage from "./OrderPage";
import ProductList from "./ProductList";
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

        const catSelection = (cate) =>{
          Axios.get("/api/getProdCat", {categoryId : cate}).then((responce) =>{

          })
        };

      return (<div className="home">
        <BrowserRouter>
        <div className="categories">
          <div className="category">Best Seller</div>
          <Link to="/">
          <div className="category">Recommendation</div>
          </Link>
          <Link to="/electronics">
          <div className="category">Electronics</div>
          </Link>
          <Link to="/homeApp">
          <div className="category">Home Appliances</div>
          </Link>
          <Link to="/pantry">
          <div className="category">Pantry</div>
          </Link>
          <Link to="/toys">
          <div className="category">Toys and Games</div>
          </Link>
          <Link to="/sports">
          <div className="category">Sports and Fitness</div>
          </Link>
        </div>
        <div>
          <Route exact path="/"><Recommendation data="0"/></Route>
          <Route exact path="/electronics"><ProductList data="1"/></Route>
          <Route exact path="/homeApp"><ProductList data="2"/></Route>
          <Route exact path="/pantry"><ProductList data="3"/></Route>
          <Route exact path="/toys"><ProductList data="4"/></Route>
          <Route exact path="/sports"><ProductList data="5"/></Route>
          <Route exact path="/orderPage" component={OrderPage}/>
        </div>
         <div className="product_list_home">
         {/*products.map(product => 
            <div className="product" key={product.product_no}>
              <div className="prodDetails">
             <div className="product_title">{product.product_name}</div>
             <div className="product_price">${product.product_price}</div>
             <div className="product_rating">{product.rating}</div>
             <div className="product_quantity">Available Qty:=== {product.quantity}</div>
             </div>
           
         </div>)*/}
   </div>
   </BrowserRouter>
   </div>
     );
 }
 export default HomeScreen;