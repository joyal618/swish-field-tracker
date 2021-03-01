import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
 import Modal from '@material-ui/core/Modal';
 import Backdrop from '@material-ui/core/Backdrop';
 import Fade from '@material-ui/core/Fade';
import axios from 'axios'
import { render } from '@testing-library/react';
import './RemoveAgent.css'
import RemoveAgentCard from './RemoveAgentCard';
import AdminNavBar from './AdminNavBar';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
    const [firstName, setFirstName]= useState('')
    const [lastName, setLastName]= useState('')
    const [emailId, setEmailId]= useState('')
    const [password, setPassword]= useState('')
    const [userRole, setUserRole]= useState('Agent')
    const [phoneNumber,setPhoneNumber]= useState('')  
    const [agent, setAgent] = useState([])

    
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
  
    axios({
      url:"/home/agent-list",
      method:"get",
      headers:{
          'Authorization':`Bearer ${localStorage.getItem("token")}`
  }
  })
            .then(res=> {
            setAgent(res.data).then(profileState => {
                console.log(JSON.stringify(this.state.agent))
              }); 
            }).catch(err=>{
                console.error(err);
            }
            )
  }, [])
  // useEffect(() => {
     
  // }, [input])
  function handleFname(e) {
    setFirstName( e.target.value);
    console.log(firstName)
  }

  function handleLname(e) {
    setLastName( e.target.value);
    console.log(lastName)
  }

  function handleEmail(e) {
    setEmailId( e.target.value);
    console.log(emailId)
  }
  
  function handlePassword(e) {
    setPassword( e.target.value);
    console.log(password)
  }

  function handlePhoneNumber(e) {
    setPhoneNumber( e.target.value);
    console.log(phoneNumber)
  }

  function addAgentDetails(){
    var agentDetails={
      "firstName":firstName,
      "lastName":lastName,
      "userEmail":emailId,
      "userRole":userRole,
      "password":password,
      "phoneNumber":phoneNumber
    }
    axios({
      url: "/home/agent-list/add-agent",
      data: agentDetails,
      method: "post",
      headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
  })
            .then(res=> {  
             console.log(res)
            }).catch(err=>{
                console.error(err);
            }
            )
            setOpen(false); 

  }
  return (
      
    <div className="logged-in-admin-wrapper">
    
            <div className="admin-page-contents">
                <div className="admin-manage-heading">

                <p className="admin-manage-heading-text"> Manage Agent</p>

                    <div className="admin-manage-heading-text"> </div>
                    <div className="admin-manage-heading-button">
                    <button type="button" className="add-button" onClick={handleOpen}>Add Agent</button>
                    </div>
                </div>
        
            </div>
            
            <div class="request-cards-list">
                {agent.map(agent =>
                    <RemoveAgentCard agent={agent}/>      
                )}
               
            </div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>

        <div class="wrapper">
    <form class="form-signin"  >       
      <h2 class="form-signin-heading">Enter the details</h2>
      <input type="text" class="form-control" name="firstName" placeholder="Enter First Name" required autofocus="" onChange={handleFname}/>
      <input type="text" class="form-control" name="lastName" placeholder="Enter Last name" required autofocus="" onChange={handleLname} />
      <input type="text" class="form-control" name="username" placeholder="Email Address" required autofocus="" onChange={handleEmail} />
      <input type="password" class="form-control" name="password" placeholder="Password" required  onChange={handlePassword}/>   
      <input type="text" class="form-control" name="phoneNumber" placeholder="Phone Number" required  onChange={handlePhoneNumber}/>      
      <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={addAgentDetails}>Submit</button>   
    </form>
  </div>

        </Fade>
      </Modal>
    </div>
  );
}
