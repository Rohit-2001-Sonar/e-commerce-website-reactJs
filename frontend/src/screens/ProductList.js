import React, {useState, useEffect} from "react";
import Axios from "axios";
import { Link, useHistory} from "react-router-dom";
import './HomeScreenStyle.css';
import {BrowserRouter, Route} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import SortedList from "./SortedList";
import ShowAZ from "./ShowAZ";
import SortedListlh from "./SortedListlh";
import SortRating from "./SortRating";
import OrderPage from "./OrderPage";

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
        });
      };

    const sorting = () =>{
      let categoryNo = props.data;
        Axios.post("/api/getCatProdSorted", {categoryNo: categoryNo}).then((responce) =>{
          setProduct(responce.data);
          console.log(responce.data, props.data, categoryNo);
        });
    }
    const addWishlist = (prodNo) =>{
      Axios.post("/api/addToWishList", {productNo : prodNo, accountNo : accountNo}).then((responce) =>{
          
      })
    };

    const buyNow = (prodNo) =>{
      Axios.post("/api/buyNow", {productNo : prodNo}).then(() =>{
          
      });
      hisOrder();
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
        <div>
          <BrowserRouter>
            <div className="product_list_home">
              <div className="sorting">
                <Link to="/showAll"><button className="sorting-btn">Show All A-Z</button></Link>
                <Link to="/sortPricelh"><button className="sorting-btn" >SortBy price(low to high)</button></Link>
                <Link to="/sortPricehl"><button className="sorting-btn" >SortBy price(high to low)</button></Link>
                <Link to="/sortRating"><button className="sorting-btn">SortBy rating</button></Link>
              </div>
                {/*products.map(product => 
                <div className="product" key={product.product_no}>
                    <div className="prodDetails">
                        <div className="product_title">{product.product_name}</div>
                        <div className="product_price">₹{product.product_price}</div>
                        <div className="product_rating"><ReactStars edit={false} activeColor="Red" size={20} isHalf={true} value={product.rating!=null?product.rating:0}/></div>
                        
                    </div>
                    <div>
                    {showQty(product.quantity)}
                    </div>
                    <div className="buttons">
                        <button className="BuyNow" onClick={()=>buyNow(product.product_no)}>Buy Now</button>
                        
                        <button className="AddtoWishList" onClick={()=>addWishlist(product.product_no)} >Add To Wishlist</button>
                    </div>
                </div>)*/}
            </div>
            <Route exact path="/showAll"><ShowAZ data={props.data}/></Route>
            <Route exact path="/sortPricelh"><SortedListlh data={props.data}/></Route>
            <Route exact path="/sortPricehl"><SortedList data={props.data}/></Route>
            <Route exact path="/sortRating"><SortRating data={props.data}/></Route>
            <Route exact path="/orderpage" component={OrderPage}/>
            </BrowserRouter>
        </div>
    );
}

export default ProductList;