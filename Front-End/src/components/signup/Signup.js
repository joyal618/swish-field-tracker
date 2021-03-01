import React, { Component } from "react";
import axios from "axios";
import "./Signup.css";
import Nav from "../../components/nav/Nav";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordMatch: true,
      passwordLength: true,
      firstName: "",
      lastName: "",
      userEmail: "",
      userRole: "",
      password: "",
      confirmPassword: "",
      status: "xyz",
    };
  }
  handleChange=(event)=> {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      var length = this.state.password.length;
      if (length > 7) {
        this.setState({ passwordLength: true, passwordMatch: true });
        var userdata = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userEmail: this.state.userEmail,
          userRole: "Customer",
          password: this.state.password,
        };
        console.log(userdata);
        axios
          .post("/home/signup", userdata)
          .then((response) => {
            console.log(response.request.responseText);
            this.setState({ status: response.request.responseText });
            if (response.request.responseText === "user created") {
              this.props.history.push("/login");
              this.setState({
                firstName: "",
                lastName: "",
                userEmail: "",
                password: "",
                confirmPassword: "",
              });
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        this.setState({ passwordLength: false, passwordMatch: true });
      }
    } else {
      this.setState({ passwordMatch: false });
    }
  }

  render() {
    return (
      <div className="signup">
        <Nav type="signup"/>
        <div className="signup-wrapper">
          <div className="caption-container">
            Sit back!
            <br />
            Track your Order!
            <br />
            Enjoy Swish Delivery!
          </div>
          <div className="form-container">
            <div className="form-input-box">
              <div className="signup-caption">Make a new Account!!</div>
              <form onSubmit={this.handleSubmit} className="form-fields">
                <div className="form-name-field">
                  <label>
                    First Name:
                    <input
                      className="signup-textbox"
                      required
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </label>
                  <label>
                    Last Name
                    <input
                      className="signup-textbox"
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="form-name-field">
                  <label>
                    Email:
                    <input
                      className="signup-textbox email-textbox"
                      required
                      type="Email"
                      name="userEmail"
                      value={this.state.userEmail}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="form-name-field">
                  <label>
                    Password:
                    <input
                      className="signup-textbox"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </label>
                  <label>
                    Confirm Password:
                    <input
                      className="signup-textbox"
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="signup-warning">
                  {!this.state.passwordMatch && (
                    <div>Password does not match</div>
                  )}
                  {this.state.status === "Email already used" && (
                    <div>Email already exists</div>
                  )}
                  {!this.state.passwordLength && (
                    <div>Password should contain 8 characters</div>
                  )}
                </div>
                <div className="form-name-field">
                  <input
                    className="submit-button"
                    type="submit"
                    value="SUBMIT"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;
