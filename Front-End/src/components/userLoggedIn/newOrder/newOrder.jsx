import React from "react";
import './newOrder.css'
import AddOrderDescription from './addOrderDescription/addOrderDescription'
import DeliveryAddress from './deliveryAddress/deliveryAddress'
import OrderConfirmation from './orderConfirmation/orderConfirmation'

// import { isValidPhoneNumber } from 'react-phone-number-input'

import OrderReceipt from './orderReceipt/orderReceipt'
// import axios from 'axios'
const validPhoneNumberRegex = RegExp(/^[6-9]\d{9}$/i);
class NewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 0, file: "", type: "", text: "",
            pickupAddress: "", deliveryAddress: "", userPhoneNumber: "",
            price: "", imagePreviewUrl: '', phoneNumberError: true,
            customerId:""
        }
    }
    
    handleNext = (e) => {
        this.setState({ pageNumber: this.state.pageNumber + 1 });
    }

    handleChange = (event, data) => {
        event.preventDefault();
        if (event.target.name === "file") {
            console.log(event.target.files)
            this.setState({ file: data.file, imagePreviewUrl: data.imagePreviewUrl })
        }
        else if(event.target.name=="userPhoneNumber"){
            this.setState({userPhoneNumber:event.target.value})
            this.setState ({phoneNumberError:validPhoneNumberRegex.test(event.target.value)})
        }

        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }
    priceCalculator=(price)=> {
        this.setState({ price: price });
    }
    comeBackButton=()=>{
        this.setState({pageNumber:this.state.pageNumber-1});
    }
    render() {
        return (
            <React.Fragment>
                <div className="header"> Order Now! </div>
                {this.state.pageNumber === 0 && <AddOrderDescription handleNext={this.handleNext} value={this.state} handleChange={this.handleChange} />}
                {this.state.pageNumber === 1 && <DeliveryAddress handleNext={this.handleNext} value={this.state} handleChange={this.handleChange} comeBackButton={this.comeBackButton}/>}
                {this.state.pageNumber === 2 && <OrderReceipt handleNext={this.handleNext} value={this.state} priceCalculator={this.priceCalculator} comeBackButton={this.comeBackButton} {...this.props} />}
            </React.Fragment>
        )
    }
}
export default NewOrder
