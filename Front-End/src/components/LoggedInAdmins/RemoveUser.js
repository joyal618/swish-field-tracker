import React, {Component} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import './RemoveUser.css'
import RemoveUserCard from './RemoveUserCard';
import AdminNavBar from './AdminNavBar';



class RemoveUser extends Component{
    constructor(props){
        super(props);
        
        this.state={
            user:[]
        }
    }

    async componentDidMount(){
        await  axios({
            url: "/home/user-list",
            method: "get",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        
        
        .then(res=> {
          this.setState({ user: res.data }).then(profileState => {
            console.log(JSON.stringify(this.state.user))
          }); 
        }).catch(err=>{
            console.error(err);
        }
        )
      } 
  

render(){
    return( 
        
        <div className="logged-in-admin-wrapper">  
           
            <div className="admin-page-contents">
                <div className="admin-manage-heading">
                <p className="admin-manage-heading-text"> Remove User</p>
                </div>
        
            </div>
            
            <div class="request-cards-list">
                {this.state.user.map(user =>
                    <RemoveUserCard user={user}/>      
                )}
               
            </div>
            
        </div>
    )
    }
}
export default RemoveUser;