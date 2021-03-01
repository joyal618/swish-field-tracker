import React,{Component} from "react";
import './activeOrder.css';
import axios from "axios";

import ActiveOrderCardDetails from './activeOrderCardDetails.js';

export default class ActiveOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            activeTasks:[]        
        } 
    }
    componentDidMount(){
        // setInterval(this.refreshStatus, 1000000000000000000000000000000000000000000000000000);
        var taskData={
            customerId:localStorage.getItem("user")
        }
     
        axios({
            url:"/home/active-tasks",
            data:taskData,
            method:"post",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res=> {
            console.log("hiiii");
          this.setState({ activeTasks: res.data })
           
          
        }).catch(err=>{
            console.error(err);
        }
        )
      
  

    }
    refreshStatus=()=>{
        var taskData={
            customerId:localStorage.getItem("user")
        }

        axios({
            url:"/home/active-tasks",
            data:taskData,
            method:"post",
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("token")}`
        }
        })
        .then(res=> {
            console.log("hiiii");
          this.setState({ activeTasks: res.data })
           
          
        }).catch(err=>{
            console.error(err);
        }
        )
        
        
    }
    componentDidUpdate(prevState) {
        if(
        prevState.activeTasks != this.state.activeTasksactiv){

        }

    }
    render(){
        return(
        <div className="active-order-container">
            <div className="active-order-header">
                Will be delivered in a swish!
            </div>
            
            {<div class="active-order-request-cards-list">
                {this.state.activeTasks.map(activeTasks =>
                 <ActiveOrderCardDetails refreshStatus={this.refreshStatus} activeTasks={activeTasks } type="active"/>      
            )}  
            </div>}
        </div>
        )
    }
}