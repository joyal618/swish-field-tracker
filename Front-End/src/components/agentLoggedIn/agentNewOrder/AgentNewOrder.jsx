import React, { Component } from "react";
import Nav from '../../nav/Nav';
import './AgentNewOrder.css';
import AgentManageOrder from '../agentManageOrder/AgentManageOrder'
import axios from 'axios'
import AgentPickedUpPage from '../agentPickedUpPage/AgentPickedUpPage'
import AgentDeliveredPage from '../agentDeliveredPage/AgentDeliveredPage'
import CallManager from '../callManager/CallManager'
import AgentNavBar from "../agentNavBar/AgentNavBar"
import AgentOrderCompletion from "../agentOrderCompletion/AgentOrderCompletion"
import AgentNoTask from "../agentNoTask/AgentNoTask"
import AgentProfile from "../agentProfile/agentProfile";
import DisplayAgentPastOrders from "../displayAgentPastOrders/DisplayAgentPastOrders"



class AgentNewOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 0,
            time: "",
            status: "",
            activePage: "",
            taskDetails: [],
            agentActiveElement: "",
        }; this.updateActivePage = this.updateActivePage.bind(this);
        // this.updateAgentActiveElement = this.updateAgentActiveElement.bind(this);
    }
    componentDidMount() {
        var userData = {
            userEmail: localStorage.getItem("user")
        }

        axios.post('/home/agent-task', userData)

            .then(({ data }) => {
                console.log(data)
                this.setState({
                    taskDetails: data,
                    activePage: data.taskStatus
                })

            })

    }
    updateAgentActiveElement(event) {
        this.setState({ agentActiveElement: event })
    }


    updateActivePage(event) {
        if (event.target.id === "active-orders" || event.target.id === "past-orders" || event.target.id === "agent-profile") {
            this.updateAgentActiveElement(event.target.id)
        }

        if (this.state.activePage === "Delivered") {
            window.location.reload()
        }
        if (Object.keys(this.state.taskDetails).length === 0 && event.target.id === "active-orders") {
            this.setState({ activePage: 'no-task-available' });
        }
        else {
            this.setState({ activePage: event.target.id })
        }


    }
    render() {
        return (
            <React.Fragment>
                <Nav type="logged-in" {...this.props} />
                <AgentNavBar
                    updateActivePage={this.updateActivePage}
                    agentActiveElement={this.state.agentActiveElement} />
                <div className="header">
                    <h1>Agent Dashboard!!</h1>
                </div>
                <div className="agent-dashboard">

                    {this.state.activePage === "no-task-available" && <AgentNoTask />}
                    {this.state.activePage === "active-orders" && <AgentManageOrder
                        type={this.state.taskExists}
                        taskDetails={this.state.taskDetails}
                        updateActivePage={this.updateActivePage} />}
                    {this.state.activePage === "accept" && <AgentPickedUpPage
                        taskDetails={this.state.taskDetails}
                        updateActivePage={this.updateActivePage}
                    />}
                    {this.state.activePage === "reject" && <CallManager />}
                    {this.state.activePage === "delivery-difficulty" && <CallManager />}

                    {this.state.activePage === "Delivered" && <AgentOrderCompletion />}


                    {this.state.activePage === "PickedUp" && <AgentDeliveredPage
                        taskDetails={this.state.taskDetails}
                        updateActivePage={this.updateActivePage}
                    />}
                    {this.state.activePage === "agent-profile" && <AgentProfile />}
                    {this.state.activePage === "past-orders" && <DisplayAgentPastOrders />}
                </div>
            </React.Fragment>

        )
    }


}


export default AgentNewOrder