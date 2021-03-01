

import { render } from '@testing-library/react';
import React, {Component} from 'react';
import admin_profile_pic from '../../resources/admin-image.jpg'

import './AdminNavBar.css'


class AdminNavBar extends Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }

render(){
    return(
        <div>
            <div className="side-nav-bar-container">
                    <div className="admin-profile-pic-and-name">
                    <img src={admin_profile_pic}  className="admin-profile-pic"  alt="nfhftuhj" /> 
                    <a href="" className="admin-profile-name"> Hello Admin!</a>
                    </div>   
                
                    <div className="admin-nav-bar-links"> 
                        <a href="" className="admin-nav-bar-text">Manage Users</a>
                        <a href="" className="admin-nav-bar-text">Manage Agents</a>
                        <a href="" className="admin-nav-bar-text">Manage Requests</a>  
                    </div>
            </div>
        </div>
    )
}
}

export default AdminNavBar;