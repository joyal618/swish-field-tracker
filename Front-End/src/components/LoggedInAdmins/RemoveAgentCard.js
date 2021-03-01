import React, {Component} from 'react';
import './RemoveAgentCard.css';
import axios from 'axios';
import Dialog from 'react-dialog';
import SlideToggle from "react-slide-toggle";
import RemoveAgent from './RemoveAgent'
import { confirmAlert } from 'react-confirm-alert';

class RemoveAgentCard extends Component{
    constructor(props){
        super(props);
        this.state={
          
        }
    }
   
     
    
    
    deleteAgentData = async () =>{
      try 
      {
          var agentData={
            userEmail: this.props.agent.userEmail         
          }   
          console.log(agentData);   
          const response = await  axios({
            url: "/home/agent-list/delete",
            data: agentData,
            method: "post",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
          


          window.location.reload();
          console.log(' Returned data:', response);
      } 
      catch(e) 
      {
          console.log(`Axios request failed: ${e}`);
      }
  }
  submit = () => {
    confirmAlert({
    title: 'Confirm User Delete',
    message: 'Are you sure you want to delete this agent',
    buttons: [
        {
        label: 'Yes',
         onClick: () =>  this.deleteAgentData().then(window.location.reload())
        },
        {
        label: 'No',
         onClick: () => this.changeOnConfirm
        }
    ]
    });
};

render(){
    return(
    <>
    <SlideToggle
    duration={800}
    collapsed
    render={({ onToggle, setCollapsibleElement, progress }) => (
      <div className="toggle-collapsible">
        <div class="single-request-card">
                <button type="button" className="request-card-task-number-button" onClick={onToggle}>{this.props.agent.firstName}</button>
                <button type="button" className="remove-button" onClick={this.submit}>Delete</button>
        </div>

        <div className="toggle-collapsible__content" ref={setCollapsibleElement}>
          <div
            className="toggle-collapsible__content-inner"
            style={{
              transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
            }}
          > 
            <p>firstName : {this.props.agent.firstName}</p>    
            <p>lastName : {this.props.agent.lastName}</p>
            <p>userEmail : {this.props.agent.userEmail}</p>
            
            
          </div>
          <div>
          <button type="button" className="request-card-close-button" onClick={onToggle}>Roll Up</button>
          </div>
        </div>
        
      </div>
    )}
    />
                      
    </>
    )}      
}

export default RemoveAgentCard;
    
