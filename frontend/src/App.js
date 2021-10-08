import himg from './ecomh.png';
import './App.css';
//import data from './data.js';
import {BrowserRouter, Route} from "react-router-dom";
import {Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import CreatePost from './screens/CreatePost';
import Axios from 'axios';


function App() {
  const resetStatus = () =>{
    Axios.get('http://localhost:3001/api/resetStatus').then((responce) => {
        
    })
  };
  return (
    <BrowserRouter>
    <div className="App">
      <div className="header">
        <Link to="/">
        <div className="logo_img">
          <img  src={himg} width="45" height="45"  alt="" />
        </div>
        </Link>
        
        <div className="header_options">
        
          <Link to="/signUp">
          <div className="header_optionSignIn">
            <span>SignUp</span>
          </div>
          </Link>
          <Link to="/logIn">
          <div className="header_optionLogIn">
            <span>LogIn</span>
          </div>
          </Link>
          <Link to="/products">
          <div className="header_optionCart">
            <span>Profile</span>
          </div>
          </Link>
          <div className="header_optionCart">
          <Link to="/logIn">
            <button onClick={() =>{
              resetStatus();
            }}>LogOut</button>
            </Link>
          </div>
        </div>
      </div>
      <main className="main">
      <div className="home">
       
        <Route  path="/" exact component={HomeScreen}/>
        <Route  path="/products" exact component={ProductScreen}/>
        <Route  path="/signUp" exact component={SignUp}/>
        <Route  path="/logIn" exact component={LogIn}/>
        <Route  path="/createPost" exact component={CreatePost}/>
      </div>
      </main>
  
    </div>
    </BrowserRouter>
  );
}

export default App;
