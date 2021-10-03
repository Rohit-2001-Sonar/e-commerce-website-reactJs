import React, {useState, useEffect} from "react"; 
import Axios from 'axios';
import {BrowserRouter, Route} from "react-router-dom";
import {Link } from "react-router-dom";
import LogIn from './LogIn';

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
      return(
        <BrowserRouter>
        <div className ="form">
            
            <label>user name</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setUsername(e.target.value)
            }}/>

            <label>password</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setPassword(e.target.value)
            }}/>

            <label>phone</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setPhone(e.target.value)
            }}/>

            <label>address</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setAddress(e.target.value)
            }}/>

            <label>d.o.b</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setDob(e.target.value)
            }}/>

            <label>gender</label>
            <input type="text" name="user_name" onChange={(e)=>{
                setGender(e.target.value)
            }}/>
            
            <Link to="/logIn">
            <button onClick={submit}>Sign Up</button>
            </Link>
            <Route exact path="/logIn" component={LogIn}/>
            
        </div>
        </BrowserRouter>
      );
}
export default SignUp;