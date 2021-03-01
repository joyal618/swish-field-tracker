import React from "react";
import './addTextDescription.css';
// import axios from 'axios';
class addTextDescription extends React.Component{

    constructor(props){
        super(props);
    }

    handleSubmit=(e)=> {
        e.preventDefault();
        this.props.handleNext();
    }

    render(){
        return(
            <div className="order-form-container">
                <form onSubmit={this.handleSubmit} className="order-form">
                    <textarea type="textarea" required name="text" id="order-input-text" value={this.props.value.text} onChange={this.props.handleChange}/>
                    <button type="submit" id="order-next-button">NEXT</button>
                </form>
            </div>
        )
    }
}
export default addTextDescription