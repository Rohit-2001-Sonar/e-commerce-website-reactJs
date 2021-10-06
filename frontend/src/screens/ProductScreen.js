import React,{useEffect, useState} from "react";
import Axios from 'axios';
import { useHistory} from "react-router-dom";
import './ProductScreenStyle.css';
import LogIn from './LogIn';

 function ProductScreen(props){
     const history = useHistory();
    let status;
     const submit = () =>{
        Axios.get('http://localhost:3001/api/status').then((responce) => {
        status = responce.data[0].status;
        //console.log(status);
        //console.log(responce.data[1]);
        if(status!=1){
            hisLogin();
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
        Axios.get("/api/products").then((responce) =>{
          setProduct(responce.data);
        })
      }
      //fetchData();

     return (
     <div>
                <div className="btn">
                    <button type="button" className="cbtn" onClick={() =>{
                        hisCreatePost();
                    }}>
                        Create New Post
                    </button>
                </div>
    <div className="product_list">
        {products.map(product => 
       
         <div className="product" key={product.id}>
             <div className="product_title">{product.title}</div>
             <div className="product_price">${product.price}</div>
             <div className="product_rating">
               {product.rating}
             </div>
           
         </div>
        )
        }
   </div>
     </div>
     );
 }
 export default ProductScreen;