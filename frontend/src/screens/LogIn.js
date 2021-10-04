import React,{useState} from 'react';
import './LogInStyle.css';
//import React, {useState, useEffect} from "react"; 
import Axios from 'axios';
import { useHistory} from "react-router-dom";

function LogIn (){
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();
    const hisHome = () => 
    {
        history.push('/HomeScreen');
        
    };
    const hisSign = () =>{
        history.push('./signUp');
    };

    return(
        <div className="base-container">
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlform="username" onChange={(e)=>{
                setUsername(e.target.value)
            }}>Username </label>
                        <input type="text" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlform="password" onChange={(e)=>{
                setPassword(e.target.value)
            }}>Password </label>
                        <input type="password" name="password" />
                    </div>
                </div>
            </div>
            <div className="btn1">
                <button type="button" className="lbtn" onClick={() =>{
                    hisHome();
                }}>
                    LOGIN
                </button>
            </div>
            <div className="signup">
                <div className="tt">
                    New User?    
                </div> 
                <div className="btn2">
                    <button type="button" className="sbtn" onClick={() =>{
                        hisSign();
                    }}>
                        SIGN UP
                    </button>
                </div>
            </div>
            
        </div>
    );
}
export default LogIn;