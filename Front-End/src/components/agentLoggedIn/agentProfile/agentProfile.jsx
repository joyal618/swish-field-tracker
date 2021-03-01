import React, { Component } from 'react'
import axios from "axios"
import './agentProfile.css'

export default class AgentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { firstName: "", lastName: "", emailId: "", showResetPassword: false }
    }
    componentDidMount() {
        let
            customerData = {
                userEmail: localStorage.getItem('user')
            }
        // axios.post("/home/my-profile", customerData)
        axios({
            url:"/home/my-profile",
            data:customerData,
            method:"post",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res => {
            this.setState({ firstName: res.data.firstName, lastName: res.data.lastName, emailId: res.data.userEmail, agentPhoneNumber: res.data.phoneNumber })
            console.log(res.data)
        })
    }
    render() {
        return (
            <div className="agent-profile-container">
                <div>
                    <div>First Name:</div>
                    <div> {this.state.firstName}</div>
                </div>
                <div>
                    <div>Last Name: </div>
                    <div> {this.state.lastName}</div>
                </div>
                <div>
                    <div>Email Id: </div>
                    <div>{this.state.emailId}</div>
                </div>
                <div>
                    <div>Phone Number: </div>
                    <div>{this.state.agentPhoneNumber}</div>
                </div>
            </div >
        )
    }
}
