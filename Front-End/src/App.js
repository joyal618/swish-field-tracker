import './App.css';
import Nav from './components/nav/Nav'
import Login from './components/login/Login'
import Home from './components/home/Home'
import Signup from './components/signup/Signup'

import {
  BrowserRouter,Route,
  Switch,
  Link
} from "react-router-dom";

import AboutUs from './components/about-us/AboutUs'
import Footer from './components/footer/Footer'
import UserLoggedIn from './components/userLoggedIn/userLoggedIn'
import ResetPassword from './components/reset-password/ResetPassword'
import ContactUs from './components/contact-us/ContactUs'

import AgentNewOrder from './components/agentLoggedIn/agentNewOrder/AgentNewOrder'
import OrderConfirmation from './components/userLoggedIn/newOrder/orderConfirmation/orderConfirmation';

import LoggedInAdmin from './components/LoggedInAdmins/LoggedInAdmin';
import RemoveUser from './components/LoggedInAdmins/RemoveUser'
import RemoveAgent from './components/LoggedInAdmins/RemoveAgent'


function App() {
  return (
  
    <BrowserRouter>
      {/* <Nav /> */}
      {/* <Route exact path="/" component={Nav}/> */}
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
      <Route path="/reset-password" component={ResetPassword}/>
      <Route path="/about-us" component={AboutUs}/>
      <Route path ="/user" component={UserLoggedIn}/>
      <Route exact path="/order-confirmed" component={OrderConfirmation}/> 
      {/* <Route exact path="/contact-us" component={ContactUs}/> */}
      {/* <Route path="/about-us" component={AboutUs}/> */}
      <Route exact path="/contact-us" component={ContactUs}/>  
      <Route path ="/agent-login" component={AgentNewOrder}/>
      <Route path="/admin-login" component={LoggedInAdmin}/>
    </BrowserRouter>

  );
}

export default App;