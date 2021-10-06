import React, {useState, useEffect} from "react";
import axios from "axios";

function CreatePost(){
    const [productName, setProductname] = useState('');
    const [productPrice, setProductprice] = useState('');
    const [quantity, setQuantity] = useState('');
    return(
        <div className="cointainer">
            <div className="form">
                    <div className="form-group">
                        <label htmlform="productname" >Product Name </label>
                        <input type="text" name="productname" onChange={(e)=>{
                setProductname(e.target.value)
            }} required />
                    </div>
                    <div className="form-group">
                        <label htmlform="productprice" >Product Price </label>
                        <input type="number" name="productprice" onChange={(e)=>{
                setProductprice(e.target.value)
            }} required />
                    </div>
                    <div className="form-group">
                        <label htmlform="quantity" >Quantity</label>
                        <input type="number" name="quantity" onChange={(e)=>{
                setQuantity(e.target.value)
            }} required />
                    </div>
                    
                    <button>Create Post</button>
                </div>
        </div>
    );
}
export default CreatePost;