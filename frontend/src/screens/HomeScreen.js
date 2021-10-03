import React, {useState, useEffect} from "react";
import axios from "axios";
//import data from "../data";



 function HomeScreen(props){
      const [products, setProduct] = useState([]);

      const fetchData = () =>{
        axios.get("/api/products").then((responce) =>{
          setProduct(responce.data);
        })
      }
      fetchData();
    /*useEffect(() => {
      const fetchData = async() =>{
        const {data} = await axios.get("/api/products");
        setProduct(data);
      }
      fetchData();
      return () =>{
          //
      };
    },[])*/
      return (<div className="home">
         <div className="product_list">
     {/*{products.map(product => 
       
         <div className="product" key={product.id}>
           <div className="product_img"><img  src={product.img}/></div>
             <div className="product_id">{product.id}</div>
             <div className="product_title">{product.title}</div>
             <div className="product_price">${product.price}</div>
             <div className="product_rating">
               {product.rating}
             </div>
           
         </div>
     )
     }*/}
   </div>
   </div>
     );
 }
 export default HomeScreen;