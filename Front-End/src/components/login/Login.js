import react,{ Component} from 'react';
import './Login.css'
import Nav from '../../components/nav/Nav'
import LoginImage from '../../resources/pexels-gustavo-fring-4254143.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: "",
            userRole: "",
            password: "",
           
            loginStatus:false,
            passwordReset:false,
          

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
         
    };
    handleChange(event)
    {
        this.setState({ [event.target.name]: event.target.value });
    }

    
     


    handleSubmit(event){
       event.preventDefault();
       var userdata = {
        userRole: this.state.userRole,
        userEmail: this.state.userEmail,
        password: this.state.password
    }
    console.log(userdata)
    axios.post("/home/login", userdata)
        .then((response) => {
            console.log(response)
            if(response.data.data==="user not found"){
                this.setState({loginStatus:true})
            }
            else if(response.data.data==="user found"){
                console.log(response.data.token)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.email);
                localStorage.setItem('userRole', response.data.role);
                
                if(response.data.role==="Admin"){
                    this.props.history.push("/admin-login");
                }
               else if(response.data.role==="Customer"){
                this.props.history.push("/user");}
                
                else if(response.data.role==="Agent"){
                    this.props.history.push("/agent-login");
                

               }
               

            }

        })
        .catch(function (err) {
            console.log(err)

        })
        }


    render() {
    return (


      
        <div className="login-container">
             <Nav type="login"/>
            <div className="login-sub-container">
                 <div className="login-image-container">
                    <img src={LoginImage}></img>
                    <div className="login-image-caption">
                     Sit Back!<br />Track Your Order!<br />Enjoy Swish Delivery!
                      </div>
                 </div>
        
                <div className="login-input">
                    <div className="login-input-container">
                        <div className="login-caption">
                            Log In
                            
                        </div>
                        <div className="login-input-field">

                            <form   onSubmit={this.handleSubmit} className="form-items">
                                <label>
                                    Role*
                                    <div  className="login-role-box">
                                        <select required name="userRole" value={this.state.userRole} onChange={this.handleChange}  > 
                                             <option value="" ></option>
                                            <option value="Customer" >Customer</option>
                                            <option value="Agent">Agent</option>
                                            <option value="Admin">Admin</option>
                                         </select>
                                    </div>
                                </label>                                                                                                                        
                            
                                <label>
                                    Email*
                                    <input required type="Email" name = "userEmail" value={this.state.userEmail} onChange={this.handleChange}/>
                                    </label>                                                                                                                              
                                <label>
                                    Password*
                                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                    </label>
                                    {this.state.loginStatus && <div>Invalid Email Or Password</div>}
                                    <div className="login-button-container">
                                    <input className="login-button" type="submit" value="Submit" />
                                    </div>
                                    
                        </form>
                        </div>
                       

                            <div className="login-alternative-options"> <Link to="/reset-password" >Forgot Password?</Link><br/>New User?<Link to="/signup" >Create account</Link></div>
                        </div>
                </div>
                
                
                </div>

            </div>
    )
}}

   


export default Login;
