import React from "react";
import './userNavBar.css';
import axios from "axios";
import CloseButton from '../../../resources/close-button-png-30221.png'
class userNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeElement: "new-order", customerId: localStorage.getItem('user'),
            userName: ""
        }

    }
    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }
    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }
    componentDidMount() {
        let userData = {
                userEmail: localStorage.getItem('user')
            }
        axios({
            url: "/home/get-name",
            data: userData,
            method: "post",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
                this.setState({ userName: res.data })
                console.log(this.state.userName)
            })
    }
    render() {
        return (
            <React.Fragment>
                <div id="mySidenav" class="sidenav">
                    <button className="closebtn" onClick={this.closeNav}> <img src={CloseButton} width="20px" height="auto" /></button>
                    <div className="nav-header">
                        Hello {this.state.userName}!
                </div>
                    <a id="new-order" onClick={this.props.updateActivePage}>New Order</a>
                    <a id="active-orders" onClick={this.props.updateActivePage}>Active Orders</a>
                    <a id="past-orders" onClick={this.props.updateActivePage}>Past Orders</a>
                    <a id="my-profile" onClick={this.props.updateActivePage}>My Profile</a>
                </div>
                <div id="burger-menu">
                <button  id="burger-menu-button" onClick={this.openNav}><i class="fa fa-bars fa-2x" aria-hidden="true"  width="100" height="100"></i></button>
            
            </div>
            
                </React.Fragment>
        )
    }
}

export default userNavBar