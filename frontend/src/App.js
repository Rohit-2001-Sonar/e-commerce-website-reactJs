import logo from './logo.svg';
import './App.css';
//import data from './data.js';
import {BrowserRouter, Route} from "react-router-dom";
import {Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="header">
        <Link to="/">
        <div className="logo_img">
          <img  src={logo} alt="" />
        </div>
        </Link>
        <div >
          <input className="header_search" type="text"/>
          <button className="search_btn" >Search</button>
        </div>
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
            <span>Cart</span>
          </div>
          </Link>
        </div>
      </div>
      <main className="main">
      <div className="home">
       
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/products" component={ProductScreen} />
        <Route exact path="/signUp" component={SignUp}/>
        <Route exact path="/logIn" component={LogIn}/>
      </div>
      </main>
  
    </div>
    </BrowserRouter>
  );
}

export default App;
