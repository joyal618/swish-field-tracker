import React from "react";
import './AgentNavBar.css';
import axios from "axios";
class agentNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        }
    }
    componentDidMount() {
        let
            custData = {
                userEmail: localStorage.getItem('user')
            }
        // axios.post("http://localhost:8080/home/get-name", custData)
        axios({
            url: "/home/get-name",
            data: custData,
            method: "post",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => { this.setState({ userName: res.data }) })
    }

    render() {
        return (
            <React.Fragment>
                <div id="mySidenav" className="agent-side-nav">
                    <div className="agent-nav-header">
                        Hello {this.state.userName}!
                    </div>
                    <div className="agent-nav-nav-menu">
                        <a id="active-orders" className={this.props.agentActiveElement} onClick={this.props.updateActivePage}>Upcoming Orders</a>
                        <a id="past-orders" className={this.props.agentActiveElement} onClick={this.props.updateActivePage}>Orders Completed</a>
                        <a id="agent-profile" className={this.props.agentActiveElement} onClick={this.props.updateActivePage}>Agent Profile</a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default agentNavBar