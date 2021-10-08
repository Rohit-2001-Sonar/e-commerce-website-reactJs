import React, {useState, useEffect} from "react";
import Axios from "axios";
import { useHistory} from "react-router-dom";

function CreatePost(){
    let [productNo, setProductno] = useState('');
    const [productName, setProductname] = useState('');
    const [productPrice, setProductprice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categoryNo, setCategoryno] = useState('');
    const [accountNo, setAccountno] = useState('');
    let status ;

    
     const checkStatus = () =>{
        Axios.get('http://localhost:3001/api/status').then((responce) => {
        status = responce.data[0].status;
        //console.log(status);
        //console.log(responce.data[1].userAcc[0].account_no);
        setAccountno(responce.data[1].userAcc[0].account_no);
        if(status!=1){
            hisLogin();
        }
    })
    return;
    };
    checkStatus();

    const history = useHistory();
    const hisLogin = () =>{
        history.push('/logIn');
    };

    /*const incProdNo = () =>{
        Axios.get('http://localhost:3001/api/prod_no').then((responce) => {
            //let num = (responce.data[0].count);
           
            //productNo = productNo +1;
            //console.log(responce.data[0].count+" "+num);
            setProductno(responce.data[0].count);
            //setProductno(productNo+1)
            console.log(productNo);
        });
        //console.log(accNo);
        //setAccNo(array[0].count);
    };*/

    const submit = () =>{
        Axios.post('http://localhost:3001/api/addProd', {productName : productName, productPrice : productPrice, quantity : quantity, categoryNo : categoryNo, accountNo : accountNo}).then((responce) => {
        if(responce.data){alert(responce.data.sqlMessage);}
        else{
            alert("Product Added successfully");
        }
    })
    };
    //console.log(categoryNo);

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

                    <div className = "form-group">
                    <label htmlform="category" >Category</label>
                    <select name="category" onChange={(e)=>{
                setCategoryno(e.target.value);
                //console.log(categoryNo);
                    }}>
                        <option defaultValue="" ></option>
                        <option value="1">Electronics</option>
                        <option value="2">Home Appliances</option>
                        <option value="3">Pantry</option>
                        <option value="4">Toys and Games</option>
                        <option value="5">Sports and Fitness</option>
                    </select>
                    </div>

                    <div className="form-group">
                        <label htmlform="quantity" >Quantity</label>
                        <input type="number" name="quantity" onChange={(e)=>{
                setQuantity(e.target.value)
            }} required />
                    </div>
                    
                    <button onClick={() =>{
                        submit();
                        //incProdNo();
                    }}>Create Post</button>

                </div>
        </div>
    );
}
export default CreatePost;