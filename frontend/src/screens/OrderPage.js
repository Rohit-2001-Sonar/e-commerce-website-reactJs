import React, {useState, useEffect} from "react";
import Axios from "axios";
import { useHistory} from "react-router-dom";
import './HomeScreenStyle.css';
import {BrowserRouter, Route} from "react-router-dom";

function OrderPage(){
    const history = useHistory();
    let [products, setProduct] = useState([]);
    let status =0, accountNo;

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
                //setAccountno(responce.data[1].userAcc[0].account_no);
                //setUseraccount(responce.data[1].userAcc[0]);
                //console.log(userAccount);
                accountNo = responce.data[1].userAcc[0].account_no;
                //console.log(accountNo);
                fetchData();
                }
            }
        });

        return () =>{
            unmount = true;
        }
    }, []);

    const hisLogin = () =>{
        history.push('/logIn');
    };

    const fetchData = () =>{
        Axios.get("/api/getBuyNowProd").then((responce) =>{
          setProduct(responce.data[0]);
          console.log(responce.data[0].product_no,products);
        });
    };

    return(
        <div>
            hi
            
        </div>
    );
}

export default OrderPage;