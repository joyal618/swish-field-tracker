import React, { Component } from 'react';
import axios from 'axios';
import SlideToggle from "react-slide-toggle";
import ActiveAgents from './ActiveAgents';

import Dialog from 'react-dialog';
import './AssignedCardDetails.css';


class UnassignedCardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      active_agents: [],
      imageStatus: true,
      textStatus: false
    }
  }

  openDialog = () => {  
    this.setState({ isDialogOpen: true });  
}
 handleClose = () =>{
   this.setState({ isDialogOpen: false }); 
 }



     componentDidMount=async()=>{
           await axios({ 
          url:"/home/active-agent",
          method:"get",
          headers:{
              'Authorization':`Bearer ${localStorage.getItem("token")}`
      }
      })
       
        .then(res=> {
          this.setState({ active_agents: res.data })
        }).catch(err=>{
            console.error(err);
        }
        )
      
      
      if(this.props.unassignedTask.taskDescription){
        this.setState({textStatus:true})
      }

  }

  downloadImage = async () => {
    var taskImage = {
      fileAttachment: this.props.unassignedTask.fileAttachment
    }
    await axios.post('http://localhost:8080/home/download-image', taskImage, { responseType: 'arraybuffer' })
      .then(res => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        this.setState({ sourceImage: "data:;base64," + base64 });
      })
      .catch(err => {
        console.error(err);
      })
      if(this.state.imageStatus){
        this.setState({imageStatus:false})
      }
      else{
        this.setState({imageStatus:true})
      }
  }

  render() {
    return (
      <>

        <SlideToggle
          duration={800}
          collapsed
          render={({ onToggle, setCollapsibleElement, progress }) => (
            <div className="toggle-collapsible">
              <div class="single-request-card">
                <button type="button" className="request-card-task-number-button" onClick={onToggle}>{this.props.unassignedTask._id.timeSecond}</button>
                <button type="button" className="request-card-assign-button" onClick={this.openDialog}>Assign</button>

              </div>

              <div className="toggle-collapsible__content" ref={setCollapsibleElement}>
                <div
                  className="toggle-collapsible__content-inner"
                  style={{
                    transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
                  }}
                >
                  <p className="toggle-display-content-text">User Email : {this.props.unassignedTask.customerId}</p>
                  <p className="toggle-display-content-text">PickUp Address : {this.props.unassignedTask.pickUpAddress}</p>
                  <p className="toggle-display-content-text">Delivery Address : {this.props.unassignedTask.deliveryAddress}</p>
                  <p className="toggle-display-content-text">Status : {this.props.unassignedTask.taskStatus}</p>
                  <p className="toggle-display-content-text">Agent Email : {this.props.unassignedTask.agentEmail}</p>
                  <p className="toggle-display-content-text">Ordered Time : {this.props.unassignedTask.orderedTime}</p>
                  <p className="toggle-display-content-text">Assigned Time : {this.props.unassignedTask.assignedTime}</p>
                  <p className="toggle-display-content-text">PickedUp Time : {this.props.unassignedTask.pickedUpTime}</p>
                  <p className="toggle-display-content-text">Delivered Time : {this.props.unassignedTask.deliveredTime}</p>
                  <p className="toggle-display-content-text">Customer Confirmation : {this.props.unassignedTask.customerConfirmation}</p>
                  {!this.state.textStatus && <div><p className="" >Image File :<button  className="open-task-request-image" onClick={this.downloadImage}>Open Image</button> </p>
                  {this.state.imageStatus && <div>
                    <img src={this.state.sourceImage} /></div>}</div>}

                  { this.state.textStatus && <div>
                    <p className="toggle-display-content-text">Task Description : {this.props.unassignedTask.taskDescription}</p>
                  </div>}

                  <p className="toggle-display-content-text">Delivery Charge: {this.props.unassignedTask.deliveryCharge}</p>
                </div>
                <div>
                  <div className="request-card-close-icon" onClick={onToggle}></div>
                </div>
              </div>

              {/* Dialog box for active agents to assign-list */}
              <div>
                {
                  this.state.isDialogOpen &&
                  <Dialog
                    title="Available Agents"
                    modal={true}
                    onClose={this.handleClose}
                  >

                    <div class="active-agents-cards-list">
                      {this.state.active_agents.map(active_agents =>
                        <ActiveAgents active_agents={active_agents} unassignedTask={this.props.unassignedTask} />
                      )}
                    </div>
                  </Dialog>
                }
              </div>
            </div>
          )}
        />

      </>
    )
  }
}
export default UnassignedCardDetails;

