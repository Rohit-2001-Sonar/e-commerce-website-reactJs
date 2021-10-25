import React,{useEffect, useState} from 'react';
import './LogInStyle.css';
//import React, {useState, useEffect} from "react"; 
import Axios from 'axios';
import { useHistory} from "react-router-dom";


function LogIn (){
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    //let status = 0;

    const submit = () =>{
        Axios.post('http://localhost:3001/api/logIn', {userName : userName, password: password}).then((responce) => {
        
        //console.log(responce);
        if(responce.data.length != 0){
            alert("Welcome "+userName);
            hisHome();
        }
        else{
            alert("invalid username password")
        }
    })
    };
    
    let history = useHistory();
    const hisHome = () => 
    {
        history.push('/products');
        
    };
    const hisSign = () =>{
        history.push('/signUp');
    };

    return(
        <div className="base-container">
            <div className="content">
                <div className="form">
                    <div className="form-group1">
                        <label htmlform="username" >Username </label>
                        <input className="input" type="text" name="username" onChange={(e)=>{
                setUsername(e.target.value)
            }} required />
                    </div>
                    <div className="form-group2">
                        <label htmlform="password" >Password </label>
                        <input className="input" type="password" name="password" onChange={(e)=>{
                setPassword(e.target.value)
            }} required />
                    </div>
                    
                </div>
            </div>
            <div className="btn1">
                <button type="button" className="lbtn" onClick={() =>{
                    submit();
                    //console.log(status);
                    /*if(submit() && status==0){
                        alert("welcome");
                        hisHome();
                    }
                    else{
                        alert("invalid username password")
                    }*/
                }}>
                    LOGIN
                </button>
            </div>
            <div className="signup">
                <div className="btn2">
                    <button type="button" className="sbtn" onClick={() =>{
                        hisSign();
                    }}>
                        Create New Account
                    </button>
                </div>
            </div>
            
        </div>
    );
}
export default LogIn;