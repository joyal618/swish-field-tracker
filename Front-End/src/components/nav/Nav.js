import './Nav.css'
import logo from '../../resources/s_connect_icon.png';
import axios from 'axios'
import React from "react";
import { Link } from 'react-router-dom'



class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null,
        }



    }
    handleChange = (event) => {
        event.preventDefault();

        var userData = {
            userEmail: localStorage.getItem('user'),
            token: localStorage.getItem('token'),
        }
        console.log(userData);
        // axios.post("http://localhost:8080/home/logout", userData)
        axios({
            url: "/home/logout",
            data: userData,
            method: "post",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                localStorage.clear();
                this.props.history.push("/login");

            })

    };





    componentDidMount() {
        if (localStorage.getItem("token") == null) {
            this.setState({ loggedIn: false });
        }
        else if (localStorage.getItem("token") != null) {
            this.setState({ loggedIn: true });
        }
    }




    render() {

        return (



                <header class="topnav-header">
                    <div class="logo-name">
                        <img src={logo}></img>
                        {this.state.loggedIn === false &&
                            <Link className="company-name" to='/'>swish.</Link>}

                        {this.state.loggedIn === true &&
                            <a className="company-name" >swish.</a>}
                    </div>
                    <div>
                        {/* <a href="" class="logo">CSS Nav</a> */}
                        <input class="menu-btn" type="checkbox" id="menu-btn" />
                        <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
                        {this.state.loggedIn === false && <ul class="menu">
                            <li><Link className={` ${this.props.type}`} to='/login'>LOGIN</Link></li>
                            <li><Link className={` ${this.props.type}`} to='/Signup'>SIGNUP</Link></li>
                            <li><Link className={` ${this.props.type}`} to='/contact-us'>CONTACT US</Link></li></ul>}
                        {this.state.loggedIn === true && <ul class="menu">
                            <li><Link className={` ${this.props.type}`} to='/' onClick={this.handleChange} >LOGOUT </Link></li></ul>}
                    </div>
                </header>
           
        )
    }
}
export default Nav;




