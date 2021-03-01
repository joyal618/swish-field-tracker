import React, {Component} from 'react';
import './RemoveUserCard.css';
import axios from 'axios';
import Dialog from 'react-dialog';
import SlideToggle from "react-slide-toggle";
import RemoveUser from './RemoveUser'
import { confirmAlert } from 'react-confirm-alert';

class RemoveUserCard extends Component{
    constructor(props){
        super(props);
        this.state={
          
        }
    }
    
    deleteUserData = async () =>{
      try 
      {
          var userData={
            userEmail: this.props.user.userEmail         
          }   
          console.log(userData);   
          const response = await  axios({
            url: "/home/user-list/delete",
            data: userData,
            method: "post",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
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
    message: 'Are you sure you want to delete this user',
    buttons: [
        {
        label: 'Yes',
         onClick: () =>  this.deleteUserData().then(window.location.reload())
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
                <button type="button" className="request-card-task-number-button" onClick={onToggle}>{this.props.user.firstName}</button>
                <button type="button" className="remove-button" onClick={this.submit}>Delete</button>
        </div>

        <div className="toggle-collapsible__content" ref={setCollapsibleElement}>
          <div
            className="toggle-collapsible__content-inner"
            style={{
              transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
            }}
          > 
            <p>firstName : {this.props.user.firstName}</p>    
            <p>lastName : {this.props.user.lastName}</p>
            <p>userEmail : {this.props.user.userEmail}</p>
            
            
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

export default RemoveUserCard;
    
