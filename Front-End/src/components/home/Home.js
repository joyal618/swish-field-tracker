import React, { Component } from 'react'
import Nav from '../nav/Nav'
import Main from '../main/Main'
import Quote from '../quote/Quote'
import Customers from '../customers/Customers'
import AboutUs from '../about-us/AboutUs'
import Footer from '../footer/Footer'
import Image from '../image/Image'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessTokenExists: ""
    }
}

componentDidMount(){
    var token= localStorage.getItem('token');

    if(token === null){
      this.setState({ accessTokenExists: "user-not-logged-in" });
    }
    else{
      if(localStorage.getItem("userRole")=="Customer"){
        this.setState({ accessTokenExists:"customer-logged-in"});
      }
      else if(localStorage.getItem("userRole")=="Agent"){
        this.setState({ accessTokenExists:"agent-logged-in"});
      }
      else if(localStorage.getItem("userRole")=="Admin"){
        this.setState({ accessTokenExists:"admin-logged-in"});
      }
      

    }
   

  }


  render() {
    return (
      <div className="main-component">
        <div className="cover-photo-container">
          <Nav  type= {this.state.accessTokenExists} {...this.props}/>
          <Main />
        </div>
        <Quote />
        <Image />
        <Customers />
        <AboutUs />
        <Footer />
      </div>
    )
  }
}

export default Home;