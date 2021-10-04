import React, {useState, useEffect} from "react"; 
import Axios from 'axios';
import { useHistory} from "react-router-dom";
import {Link } from "react-router-dom";
import LogIn from './LogIn';
import './SignUpStyle.css';
//import SignUp from './SignUp';

function SignUp(){
    
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');

    const submit = () =>{
        Axios.post('http://localhost:3001/api/signUp', {userName : userName, password: password, phone: phone, address: address, dob: dob, 
    gender: gender}).then(() => {
        alert("SignUp Successfull");
    })
    };

    let history = useHistory();
    const hisFun = () => 
    {
        history.push('/logIn');
        
    };
      return(
        
        <div className ="form">
            <div className="form-group">
            <label>user name</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setUsername(e.target.value)
            }}/>
            </div>

            <div className="form-group">
            <label>password</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            </div>

            <div className="form-group">
            <label>phone</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setPhone(e.target.value)
            }}/>
            </div>
            <div className="form-group">
            <label>address</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setAddress(e.target.value)
            }}/>
            </div>

            <div className="form-group">
            <label>d.o.b</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setDob(e.target.value)
            }}/>
            </div>

            <div className="form-group">
            <label>gender</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setGender(e.target.value)
            }}/>
            </div>
            
            
            <button className="sbtn" onClick={() =>{
                hisFun();
                submit()
            }
            } >Sign Up</button>
            
        </div>
        
      );
}
export default SignUp;