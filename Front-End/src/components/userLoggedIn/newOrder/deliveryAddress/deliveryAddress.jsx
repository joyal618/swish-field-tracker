import React from "react";
import './deliveryAddress.css';
import Address from '../../../../resources/address2.svg'

// import axios from 'axios';
class DeliveryAddress extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleNext();
    }
    render() {
        return (
            <>
                <div className="delivery-address-container">
                    <div className="section-header">Add Delivery Address!</div>
                    <div className="address-image-wrapper">
                        <div className="delivery-address-wrapper">
                            <form onSubmit={this.handleSubmit} className="order-form address">
                                <p>Pickup Address*</p>
                                <textarea required
                                    type="textarea"
                                    name="pickupAddress"
                                    id="address-input"
                                    value={this.props.value.pickupAddress}
                                    onChange={this.props.handleChange} />
                                <p>Delivery Address*</p>
                                <textarea required
                                    type="textarea"
                                    name="deliveryAddress"
                                    id="address-input"
                                    value={this.props.value.deliveryAddress}
                                    onChange={this.props.handleChange} />
                                <p>Phone Number*</p>
                                <input required
                                    type="text"
                                    name="userPhoneNumber"
                                    id="phone-input"
                                    value={this.props.value.userPhoneNumber}
                                    onChange={this.props.handleChange} />
                                {this.props.value.phoneNumberError ?
                                    "" :
                                    <span> Invalid Phone Number!</span>}
                                <div className="delivery-buttons">
                                    <button
                                        type="back"
                                        onClick={this.props.comeBackButton}
                                        id="address-next-button">
                                        BACK
                            </button>
                                    <button disabled={!this.props.value.phoneNumberError}
                                        type="submit"
                                        id="address-next-button">
                                        NEXT
                            </button>
                                </div>
                            </form>
                        </div>
                        <div className ="address-image-container">
                            <img src={Address}/>
                        </div>
                        </div>
                    </div>
            </>
        )
    }
}

export default DeliveryAddress