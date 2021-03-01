import React, { Component } from 'react';
import axios from 'axios';

import './ActiveAgents.css'

import { confirmAlert } from 'react-confirm-alert';


class ActiveAgents extends Component{
    constructor(props){
        super(props);
        this.state={         
        }  
    
    }
    refreshPage = ()=>{
        window.location.reload(true);
    }


    updateTaskData = () =>{
        try 
        {
            var taskData={
                taskId: this.props.unassignedTask.taskId, 
                agentEmail: this.props.active_agents.userEmail
            }      
            const response =  axios({
                url:"/home/task-update",
                data:taskData,
                method:"post",
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem("token")}`
            }
            })
            
            this.refreshPage();
            console.log(' Returned data:', response);
            console.log(this.props.unassignedTask.pickUpAddress);
        } 
        catch(e) 
        {
            console.log(`Axios request failed: ${e}`);
        }
    }

    submit = () => {
        confirmAlert({
        title: 'Confirm Agent Assign',
        message: 'Are you sure you want to assign?',
        buttons: [
            {
            label: 'Yes',
             onClick: () =>  this.updateTaskData()
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
        <div>
            <div className="single-active-agent-card">
                <div>
                    <p className="active-agent-email"> Agent Email: {this.props.active_agents.userEmail}</p>
                </div>  
                <div>
                    <button type="button" className="active-agent-assign-button" onClick={
                        this.submit}>Assign Agent</button>           
                </div>   
            </div>
            <hr/>
        </div>
        )
    }
}

export default ActiveAgents;



