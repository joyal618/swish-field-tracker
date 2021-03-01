import React, {Component} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import './LoggedInAdmin.css'


import AssignedCardDetails from './AssignedCardDetails';
import UnassignedCardDetails from './UnassignedCardDetails';

import AdminNavBar from './AdminNavBar';


class ManageRequests extends Component{
    constructor(props){
        super(props);
        this.state={
            task:[],
            assignedTask:[],
            unassignedTask:[],
            isUassigned: true
        }

        this.setFilterAssign=this.setFilterAssign.bind(this);
        this.setFilterUnassign=this.setFilterUnassign.bind(this);
        

    }

    async componentDidMount(){
        this.setFilterUnassign();
      } 

      setFilterUnassign(){
      
        axios({
            url:"/home/unassigned-tasks",
            method:"get",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res=> {

          this.setState({ unassignedTask: res.data,isUassigned: true}) 
        }).catch(err=>{
            console.error(err);
        }
        )

      }
      setFilterAssign(){
        
        axios({
            url:"/home/assigned-tasks",
            method:"get",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res=> {
            console.log("assigned")
          this.setState({ assignedTask: res.data,isUassigned:false })
         
        }).catch(err=>{
            console.error(err);
        }
        )
    }

render(){
    return( 
<div className="admin-page-contents-main">
    <div className="admin-page-contents">
                <div className="admin-manage-heading">
                    <p className="admin-manage-heading-text">Requests</p>
                </div>
                <div className="admin-filter-tasks">
                    <button className="filter-tasks-link" onClick={this.setFilterUnassign}>Un-assigned</button>
                    <button className="filter-tasks-link" onClick={this.setFilterAssign}>Assigned</button>        
                </div>
    </div>

    
            {this.state.isUassigned && <div class="request-cards-list-unassign">
            <p className="card-request-subheading">Un-assigned Requests</p>
            <div className="request-cards-scroll">
                {this.state.unassignedTask.map(unassignedTask =>
                    <UnassignedCardDetails unassignedTask={unassignedTask}/>      
                )} 
            </div> 
            </div> }

        
      
            {!this.state.isUassigned && <div class="request-cards-list-assign">
            <p className="card-request-subheading">Assigned Requests</p>
            <div className="request-cards-scroll">
                {this.state.assignedTask.map(assignedTask =>
                    <AssignedCardDetails assignedTask={assignedTask}/>      
                )}
            </div>  
            </div>}
</div>
    )
}
}

export default ManageRequests;
