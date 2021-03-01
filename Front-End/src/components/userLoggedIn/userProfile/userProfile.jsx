import React from "react";
import './userProfile.css';
import axios from "axios";
import UserResetPassword from './userResetPassword/userResetPassword';
import Profile from '../../../resources/profile.svg'

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", emailId: "", showResetPassword: false }
    }
    componentDidMount() {
        let
            customerData = {
                userEmail: localStorage.getItem('user')
            }
       
        axios({
            url:"/home/my-profile",
            data:customerData,
            method:"post",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res => {
            this.setState({ firstName: res.data.firstName, lastName: res.data.lastName, emailId: res.data.userEmail })
            console.log(res.data)
        })
    }
    comeBack = () => {
        this.setState({ showResetPassword: false })
    }
    render() {
        return (
            <div className="user-profile-container">
                <div className="profile-header">
                    My Dashboard!
                </div>
                {this.state.showResetPassword ? <UserResetPassword comeBack={this.comeBack} {...this.props}/>:
                    <div>
                    <div className="profile-image-wrapper">
                        <div className="profile-details">
                            <div>First Name: <br/> {this.state.firstName}</div>
                            <div>Last Name: <br/> {this.state.lastName}</div>
                            <div>Email Id: <br/> {this.state.emailId}</div>
                        </div>
                        <div className="profile-image-container">
                            <img src={Profile}/>
                        </div>
                        </div>
                        <div className="buttons">
                            <button id="reset-password" className="edit-button" onClick={() => this.setState({ showResetPassword: true })}>Reset Password</button>
                        </div>
                    </div> 
                    }
            </div>
        )
    }
}