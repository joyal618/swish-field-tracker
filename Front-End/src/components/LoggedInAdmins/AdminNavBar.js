import { render } from '@testing-library/react';
import React, {Component} from 'react';


import './AdminNavBar.css'


class AdminNavBar extends Component{
    constructor(props){
        super(props);
        this.state={
            activeElement: "manage-users"
        }
    }

render(){
    return(
            <div className="side-nav-bar-container">
                    <div className="admin-profile-pic-and-name">
                    <div className="admin-profile-pic"  alt="admin-icon" ></div> 
                    <a href="" className="admin-profile-name"> Hello Admin!</a>
                    </div>   
                    <div className="admin-sidebar-links">
                    <a id="manage-requests"  className="admin-sidebar-link-text" onClick={this.props.updateActiveComponent}>Manage Requests</a>
                    <a id="manage-users" className="admin-sidebar-link-text" onClick={this.props.updateActiveComponent}>Manage Users</a>
                    <a id="manage-agents" className="admin-sidebar-link-text" onClick={this.props.updateActiveComponent}>Manage Agents</a>
                    </div>
            </div>
        
    )
}
}

export default AdminNavBar;