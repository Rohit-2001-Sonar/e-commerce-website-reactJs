import React, {useState, useEffect} from "react"; 
import Axios from 'axios';
import { useHistory} from "react-router-dom";
import {Link } from "react-router-dom";
import LogIn from './LogIn';
import './SignUpStyle.css';
//import SignUp from './SignUp';

function SignUp(){
    
    //const [array, setArray] = useState([]);
    
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');

    /*useEffect(() =>{
        Axios.get('http://localhost:3001/api/acc_no').then((responce) => {
            
            setAccNo(responce.data[0].count);
            console.log(responce.data[0].count);
        });
        //console.log(accNo);
        //setAccNo(array[0].count);
    }, []);

    const acc_no = () =>{ [0].count
        Axios.get('http://localhost:3001/api/acc_no').then((responce) => {
        //alert(responce.data);
        setArray(responce.data);
        console.log(array.count);
        console.log(responce.data);
    })
    };*/
    //acc_no();

    const submit = () =>{
        Axios.post('http://localhost:3001/api/signUp', {userName : userName, password: password, phone: phone, address: address, dob: dob, 
    gender: gender}).then((responce) => {
        //alert("SignUp Successfull");
        console.log(responce);
        
        if(responce.data == 1){
            alert("Sign Up Successful");
            hisFun();
        }
        else{
            alert(responce.data.sqlMessage);
        }
    })
    };

    let history = useHistory();
    const hisFun = () => 
    {
        history.push('/logIn');
        
    };
      return(
        
        <div className ="form">
            <div className="form-group1">
            <label>Username</label>
            <input className="input" type="text" name="user_name" onChange={(e)=>{
                setUsername(e.target.value)
            }} required/>
            </div>

            <div className="form-group2">
            <label>Password</label>
            <input className="input" type="text" name="user_name" onChange={(e)=>{
                setPassword(e.target.value)
            }} required/>
            </div>

            <div className="form-group3">
            <label>Phone</label>
            <input className="input" type="text" name="user_name" onChange={(e)=>{
                setPhone(e.target.value)
            }} required/>
            </div>
            <div className="form-group4">
            <label>Address</label>
            <input className="input" type="text" name="user_name" onChange={(e)=>{
                setAddress(e.target.value)
            }} required/>
            </div>

            <div className="form-group5">
            <label>D.O.B</label>
            <input className="input" type="text" name="user_name" onChange={(e)=>{
                setDob(e.target.value)
            }} required/>
            </div>

            <div className="form-group6">
                
            <input className="input" type="radio" id="male" name="gender" value="male" onChange={(e)=>{
                setGender("male")
            }}/>
            <label htmlFor="male">Male</label>
            </div>
            <div className="form-group7">
            <input className="input" type="radio" id="female" name="gender" value="female" onChange={(e)=>{
                setGender("female")
            }}/>
            <label htmlFor="female">Female</label>
        
            </div>
            
            
            <button type="submit" className="sbtn" onClick={() =>{
                //hisFun();
                //acc_no();
                submit()
            }
            } >Sign Up</button>
            
        </div>
        
      );
}
export default SignUp;