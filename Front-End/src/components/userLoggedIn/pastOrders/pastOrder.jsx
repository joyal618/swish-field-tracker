import React from "react";
import './pastOrder.css';
import axios from "axios";
import ActiveOrderCardDetails from "../activeOrder/activeOrderCardDetails"

export default class PastOrder extends React.Component{
    constructor(props){
        super(props);
        this.state={
            activeTasks:[] 
        }
    }
    componentDidMount(){
        var userData={
            userEmail:localStorage.getItem("user")
        }
        console.log(userData);
      
        axios({
            url:"/home/delivered-tasks",
            data:userData,
            method:"post",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res=> {
            console.log(res);
          this.setState({ activeTasks: res.data })
           
          
        }).catch(err=>{
            console.error(err);
        }
        )
        

    }
    render(){
        return(
        <div className="past-order-container">
            <div className="past-order-header">
                Your Orders!
            </div>
            {<div class="active-order-request-cards-list">
                {this.state.activeTasks.map(activeTasks =>
                 <ActiveOrderCardDetails activeTasks={activeTasks } type="delivered"/>      
            )}  
            </div>}
        </div>
        )
    }
}