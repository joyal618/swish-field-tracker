import React, {Component} from 'react';
import axios from 'axios';
import SlideToggle from "react-slide-toggle";
import ActiveAgents from './ActiveAgents';

import Dialog from 'react-dialog';
import './AssignedCardDetails.css';

class AssignedCardDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            isDialogOpen: false,
            agentNumber:"",
            textStatus:false,
            imageStatus:true
                  
        }
    }
    
    openDialog = () => this.setState({ isDialogOpen: true })
 
    handleClose = () => this.setState({ isDialogOpen: false })

    async componentDidMount(){
      var userData={
        userEmail: this.props.assignedTask.agentEmail 
      }
        await  axios({
          url:"/home/agent-number",
          data:userData,
          method:"post",
          headers:{
              'Authorization':`Bearer ${localStorage.getItem("token")}`
      }
      })
      
        .then(res=> {
          console.log(res.data)
          this.setState({ agentNumber: res.data })
          console.log(this.state.agentNumber);
        }).catch(err=>{
            console.error(err);
        }
        )

        if(this.props.assignedTask.taskDescription){
          this.setState({textStatus:true})
        }
      } 

      downloadImage = async () => {
        var taskImage = {
          fileAttachment: this.props.assignedTask.fileAttachment
        }
        await axios({
          url:"/home/download-image",
          data:taskImage,
          method:"post",
          responseType: 'arraybuffer',
          headers:{
              'Authorization':`Bearer ${localStorage.getItem("token")}`
      }
      })
        // axios.post('http://localhost:8080/home/download-image', taskImage, { responseType: 'arraybuffer' })
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

render(){
  const {assignedTask}=this.props;
    return(
    <>   
    <SlideToggle
    duration={800}
    collapsed
    render={({onToggle, setCollapsibleElement, progress }) => (
      <div className="toggle-collapsible">
        <div class="single-request-card">
                <button type="button" className="request-card-task-number-button" onClick={onToggle}>{this.props.assignedTask._id.timeSecond}</button>
                <a href={'tel:'+`${this.state.agentNumber }`}> <img className="call-agent-icon"></img></a>
                
        </div>

        <div className="toggle-collapsible__content" ref={setCollapsibleElement}>
          <div
            className="toggle-collapsible__content-inner"
            style={{
              transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
            }}

          >           
            <p className="toggle-display-content-text">User Email : {assignedTask.customerId}</p>
            <p className="toggle-display-content-text">PickUp Address : {assignedTask.pickUpAddress}</p>
            <p className="toggle-display-content-text">Delivery Address : {assignedTask.deliveryAddress }</p>
            <p className="toggle-display-content-text">Status : {assignedTask.taskStatus}</p>
            <p className="toggle-display-content-text">Agent Email : {assignedTask.agentEmail }</p>
            <p className="toggle-display-content-text">Agent Number : {this.state.agentNumber}</p>
            <p className="toggle-display-content-text">Ordered Time : {this.props.assignedTask.orderedTime}</p>
            <p className="toggle-display-content-text">Assigned Time : {this.props.assignedTask.assignedTime }</p>
            <p className="toggle-display-content-text">PickedUp Time : {this.props.assignedTask.pickedUpTime}</p>
            <p className="toggle-display-content-text">Delivered Time : {this.props.assignedTask.deliveredTime }</p>
            <p className="toggle-display-content-text">Customer Confirmation : {this.props.assignedTask.customerConfirmation}</p> 
            {!this.state.textStatus && <div><p className="" >Image File :<button className="open-task-request-image" onClick={this.downloadImage}>Open Image</button> </p>
                  {this.state.imageStatus && <div>
                    <img src={this.state.sourceImage} /></div>}</div>}
                    
                  { this.state.textStatus && <div>
                    <p className="toggle-display-content-text">Task Description : {this.props.assignedTask.taskDescription}</p>
                  </div>}
          </div>
          <div>
            <div className="request-card-close-icon" onClick={onToggle}></div>
          </div>
        </div>
   </div>
    )}
    />                    
    </>
    )}      
}

export default AssignedCardDetails;
    
