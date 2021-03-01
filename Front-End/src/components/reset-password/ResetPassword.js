import React, { Component } from "react";
import Nav from "../../components/nav/Nav";
import LoginImage from "../../resources/pexels-gustavo-fring-4254143.jpg";
import "./ResetPassword.css";
import axios from "axios";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      validateEmail: "",
      newPassword: "",
      confirmNewPassword: "",
      otpState: "A",
      messageStatus:"",
    };
    this.otpCreation = this.otpCreation.bind(this);
    this.handleOTP = this.handleOTP.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewPassword= this.handleNewPassword.bind(this);
    this.gotoLoginPage= this.gotoLoginPage.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  otpCreation(event) {
    event.preventDefault();
    var userData = {
      userEmail: this.state.validateEmail,
    };
    axios
          .post("/home/otp-generation", userData)
          .then((response) => {
            if(response.request.responseText==="Otp created") {
              this.setState({ otpState: "B" ,messageStatus:"B"})
            }
            else if(response.request.responseText==="User not found") {
              this.setState({ messageStatus:"A"})
            }
          })
            .catch(function (err) {
            });
  }
  handleOTP(event) {
    event.preventDefault();
    var userData = {
      userEmail: this.state.validateEmail,
      otp: this.state.otp,
    };
    axios
          .post("/home/otp-validation", userData)
          .then((response) => {
            if(response.request.responseText==="Valid OTP") {
              this.setState({ otpState: "C" ,messageStatus:"D"})
            }
            else if (response.request.responseText==="OTP not found"){
              this.setState({messageStatus:"C"})
            }
          })
          .catch(function (err) {
            console.log(err);
          });
   }
   handleNewPassword(event){
     event.preventDefault();
    
   
     if(this.state.confirmNewPassword===this.state.newPassword)
     {var length = this.state.newPassword.length;
      if (length > 7) {
      var userData = {
        userEmail: this.state.validateEmail,
        password:this.state.newPassword,
      }
      axios
          .post("/home/change-password", userData)
          .then((response) => {
          
            if(response.request.responseText==="Password changed successfully") {
              this.setState({ otpState: "" ,messageStatus:"E"})
            }
          })
          .catch(function (err) {
            console.log(err);
          });
        } else if(length<8)
        {this.setState({messageStatus:"G"})}

     }
     else if(this.state.confirmNewpassword!=this.state.newPassword){
       this.setState({messageStatus:"F"})

     }
   }
   gotoLoginPage(event) {
     event.preventDefault();
     this.props.history.push("/login")
   }

  render() {
    return (
      <div className="reset-container">
        <Nav type="login"/>
        <div className="reset-sub-container">
          <div className="reset-image-container">
            <img src={LoginImage} ></img>
            <div className="reset-image-caption">
              Sit Back!
              <br />
              Track Your Order!
              <br />
              Enjoy Swish Delivery!
            </div>
          </div>

          <div className="reset-input">
            <div className="reset-input-container">
              <div className="reset-caption">Reset Password</div>
              <div className="reset-input-field">
                <form
                  onSubmit={this.hanmit}
                  className="form-items-resetpassword"
                >
                  <label>
                    Email*
                    <input
                      required
                      type="Email"
                      name="validateEmail"
                      value={this.state.validateEmail}
                      onChange={this.handleChange}
                    />
                  </label>
                  {this.state.messageStatus==="E" &&<div><div className="signup-warning">Password Changed successfully!!!!You Can Login Now</div>
                  <div className="reset-button-container">
                      <input
                        className="reset-button"
                        type="submit"
                        value="login"
                        onClick={this.gotoLoginPage}
                      />
                  </div></div> }
                  {this.state.messageStatus==="A"&&<div className="signup-warning">User not found </div>}
                  {this.state.otpState === "A" && (
                    
                    <div className="reset-button-container">
                      <input
                        className="reset-button"
                        type="submit"
                        value="Next"
                        onClick={this.otpCreation }
                      />
                  </div>
                   
                  )}
                 
                  {this.state.otpState === "B" && (
                    <div className="form-items-resetpassword">
                      <label>
                        OTP:
                        <input
                          type="text"
                          name="otp"
                          value={this.state.otp}
                          onChange={this.handleChange}
                        />
                      </label>
                      {this.state.messageStatus==="B" && <div className="signup-warning">OTP send to your email address</div>}
                      {this.state.messageStatus==="C" && <div className="signup-warning">Invalid OTP or Session expired</div>}
                      <div className="reset-button-container">
                        <input
                          className="reset-button"
                          type="submit"
                          value="Verify OTP"
                          onClick={this.handleOTP}
                        />
                      </div>
                    </div>
                  )}
                  {this.state.otpState === "C" && (
                    <div className="form-items-resetpassword">
                      <label>
                        New password:
                        <input
                          type="Password"
                          name="newPassword"
                          value={this.state.newPassword}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label>
                        Confirm new Password:
                        <input
                          type="Password"
                          name="confirmNewPassword"
                          value={this.state.confirmNewPassword}
                          onChange={this.handleChange}
                        />
                      </label>
                      
                      {this.state.messageStatus==="F"&& <div className="signup-warning"> Password do not match</div>}
                      {this.state.messageStatus==="G"&& <div className="signup-warning"> Password should contain atleast 8 characters</div>}
                      <div className="reset-button-container">
                        <input
                          className="reset-button"
                          type="submit"
                          value="Confirm"
                          onClick={this.handleNewPassword}
                        />
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPassword;
