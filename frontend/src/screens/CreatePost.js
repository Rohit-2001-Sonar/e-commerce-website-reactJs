import React, {useState, useEffect} from "react";
import axios from "axios";

function CreatePost(){
    return(
        <div className="cointainer">
            <div className="form">
                    <div className="form-group">
                        <label htmlform="productname" >Product Name </label>
                        <input type="text" name="productname" onChange={(e)=>{
                //setProductname(e.target.value)
            }} required />
                    </div>
                    <div className="form-group">
                        <label htmlform="password" >Password </label>
                        <input type="text" name="password" onChange={(e)=>{
                //setPassword(e.target.value)
            }} required />
                    </div>
                    
                </div>
        </div>
    );
}
export default CreatePost;