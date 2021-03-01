import React, {Component} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import './LoggedInAdmin.css'
import AdminNavBar from './AdminNavBar';

import ManageRequests from './ManageRequests';
import RemoveAgent from './RemoveAgent';
import RemoveUser from './RemoveUser'
import Nav from '../../components/nav/Nav'
class LoggedInAdmin extends Component{
    constructor(props){
        super(props);
            this.state = { activeComponent: "manage-requests" };
        }
         updateActiveComponent=(event)=>{
            console.log(event.target.id)
            this.setState({activeComponent:event.target.id})
        }

render(){
    
    return(      
        <div className="logged-in-admin-wrapper">  
            <Nav type="logged-in" {...this.props}/>
            <div>
            <AdminNavBar updateActiveComponent={this.updateActiveComponent}/>
            </div> 

            {this.state.activeComponent==="manage-requests" && <ManageRequests/>}
            {this.state.activeComponent==="manage-users" && <RemoveUser />}
            {this.state.activeComponent==="manage-agents" && <RemoveAgent />} 
      
        </div>
    )
    }
}
export default LoggedInAdmin;