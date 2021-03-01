import React, { Component } from 'react';
import './AgentPickedUpPage.css';
import axios from 'axios'
import SlideToggle from "react-slide-toggle";


class AgentPickedUpPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        };this.handleClick= this.handleClick.bind(this);
    }

    handleClick(e) {

        if (e.target.id === 'PickedUp') {

            this.setState({ pickedUpButtonState: true })
            let data = { time: Date().toLocaleString() }
            console.log(data)
            var taskUpdationData = {
                taskStatus: "PickedUp",
                pickedUpTime: data.time,
                deliveredTime: "",
                taskId: this.props.taskDetails.taskId,
            }
            console.log(taskUpdationData)
            axios({
                url:"/home/pickup-time-updation",
                data:taskUpdationData,
                method:"post",
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem("token")}`
            }
            })
        }
        else if (e.target.id === "delivery-difficulty") {
            var taskUpdationData = {
                taskStatus: "Not Assigned",
                agentEmail: "",
                assignedTime: "",
                pickedUpTime: "",
                deliveredTime: "",
                taskId: this.props.taskDetails.taskId,
            }
            axios({
                url:"/home/delivery-difficulty",
                data:taskUpdationData,
                method:"post",
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem("token")}`
            }
            })}
        this.props.updateActivePage(e)
    }
    render() {
        return (
            <React.Fragment>
                <SlideToggle
                    duration={800}
                    collapsed
                    render={({ onToggle, setCollapsibleElement, progress }) => (
                        <div className="toggle-collapsible">
                            <div class="single-request-card">
                                {this.props.activePage ? <></> : <>
                                    <button type="button" className="request-card-task-number-button" onClick={onToggle}>{this.props.taskDetails.taskId}<i class="fas fa-caret-down"></i></button>

                                    <div className="agent-task-response-btn">

                                        <button id="PickedUp"
                                            taskDetails={this.props.taskDetails}
                                            onClick={this.handleClick}>Picked Up</button>
                                        <button id="delivery-difficulty"
                                            taskDetails={this.props.taskDetails}
                                            onClick={this.handleClick}>Difficulty in Delivery</button>

                                    </div>
                                </>}



                            </div>

                            <div className="toggle-collapsible__content" ref={setCollapsibleElement}>
                                <div
                                    className="toggle-collapsible__content-inner"
                                    style={{
                                        transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
                                    }}
                                >
                                    <p>Task Id : {this.props.taskDetails.taskId}</p>
                                    <p>Pick Up Address : {this.props.taskDetails.pickUpAddress}</p>
                                    <p>Delivery Address : {this.props.taskDetails.deliveryAddress}</p>
                                    <p>Delivery Charge : {this.props.taskDetails.deliveryCharge}</p>


                                </div>
                                <div>
                                    <button type="button" className="request-card-close-button" onClick={onToggle}>Roll Up</button>
                                </div>

                            </div>

                        </div>
                    )}
                />














                {/* <div className="agent-task-response">
                    <div className="agent-task-id"> {this.props.taskDetails.taskId} </div>
                    <div className="agent-task-response-btn">
<<<<<<< HEAD

                        <button id="PickedUp"
=======
                        <button id="picked-up"
>>>>>>> d96cd042771f978edfa23af324c02a3e79aef808
                            taskDetails={this.props.taskDetails}
                            onClick={this.handleClick}>Picked Up</button>
                        <button id="delivery-difficulty"
                            taskDetails={this.props.taskDetails}
                            onClick={this.handleClick}>Difficulty in Delivery</button>
<<<<<<< HEAD

                    </div> */}





                {/* <button id="delivery-difficulty" onClick={this.handleClick} disabled={this.state.deliveryDifficultyButtonState} >Difficulty In Delivery</button>
=======
                    </div>
                    {/* <button id="delivery-difficulty" onClick={this.handleClick} disabled={this.state.deliveryDifficultyButtonState} >Difficulty In Delivery</button>
>>>>>>> d96cd042771f978edfa23af324c02a3e79aef808
                    <div className="agent-status-toggle">
                        <button id="picked-up" 
                        onClick={this.handleClick} 
                        disabled={this.state.pickedUpButtonState} >Picked Up</button>
                        <button id="delivered" onClick={this.handleClick} disabled={this.state.deliveredButtonState}>Delivered</button> */}
                {/* </div> */}
                {/* </div> */}
            </React.Fragment>
        )
    }
}
export default AgentPickedUpPage