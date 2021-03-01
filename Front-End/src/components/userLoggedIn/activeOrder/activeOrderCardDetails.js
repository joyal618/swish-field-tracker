import React from "react";
import SlideToggle from "react-slide-toggle";
import '../../LoggedInAdmins/AssignedCardDetails.css';
import checkActive from "../../../resources/checkActive.png"
import checkInactive from "../../../resources/checkInactive.png"
import axios from "axios"

export default class ActiveOrderCardDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textStatus:false,
      imageStatus:true
    }
  }
    componentDidMount=()=>{
              setInterval(this.props.refreshStatus, 10000);

        if(this.props.activeTasks.taskDescription){
          this.setState({textStatus:true})
        }

    }
    downloadImage = async () => {
      var taskImage = {
        fileAttachment: this.props.activeTask.fileAttachment
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
  
  render() {
    return (
      <SlideToggle
        duration={800}
        collapsed
        render={({ onToggle, setCollapsibleElement, progress }) => (
          <div className="toggle-collapsible">
            <div class="single-request-card">
              <button type="button" className="request-card-task-number-button" onClick={onToggle}>{this.props.activeTasks.customerId}</button>
            </div>
        <div className="toggle-collapsible__content" ref={setCollapsibleElement}>
          <div
            className="toggle-collapsible__content-inner"
            style={{
              transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
            }}
          >    
            
            <p>PickUp Address : {this.props.activeTasks.pickUpAddress}</p>

            <p>Delivery Address : {this.props.activeTasks.deliveryAddress }</p>

            {!this.state.textStatus && <div><p className="" >Image File :<button className="open-task-request-image" onClick={this.downloadImage}>Open Image</button> </p>
                  {this.state.imageStatus && <div>
                    <img src={this.state.sourceImage} /></div>}</div>}
                    
                  { this.state.textStatus && <div>
                    <p className="toggle-display-content-text">Task Description : {this.props.activeTasks.taskDescription}</p>
                  </div>}

          <p>{this.props.activeTasks.orderedTime!=null?
           <img src={checkActive} width="20" height="20"></img>:<img src={checkInactive} width="20" height="20"></img>
            }Ordered {this.props.activeTasks.orderedTime}</p>

          <p>{this.props.activeTasks.assignedTime!=null?<img src={checkActive} width="20" height="20"></img>:
            <img src={checkInactive} width="20" height="20"></img>
            }Assigned : {this.props.activeTasks.assignedTime }</p>

            <p>{this.props.activeTasks.pickedUpTime!=null?<img src={checkActive} width="20" height="20"></img>:
            <img src={checkInactive} width="20" height="20"></img>
            }PickedUp : {this.props.activeTasks.pickedUpTime}</p>

            <p>{this.props.activeTasks.deliveredTime!=null?<img src={checkActive} width="20" height="20"></img>:
            <img src={checkInactive} width="20" height="20"></img>
            }Delivered : {this.props.activeTasks.deliveredTime }</p>
            
            
          </div>
          <div>
          <button type="button" className="request-card-close-button" onClick={onToggle}>Roll Up</button>
          </div>
          </div>
          </div>
        )}
      />
    )
  
}
}