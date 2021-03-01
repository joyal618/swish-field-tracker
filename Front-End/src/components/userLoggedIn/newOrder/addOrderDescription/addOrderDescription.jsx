import React from "react";
import './addOrderDescription.css';
import UploadFile from './uploadFile/uploadFile';
import AddTextDescription from './addTextDescription/addTextDescription';
import Shopping from '../../../../resources/shopping_app.svg'


class addOrderDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeElement: true };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ activeElement: e.target.id })
    }

    render() {
        return (
            <React.Fragment>
                <div className="image-order-desc-wrapper">

                    <div className="order-description">
                        <div className="section-header">
                            Add Items for Pickup!
                        </div>


                        <div className="order-switch-button-wrapper">
                            <button id="image" className="switching-button" onClick={this.handleClick}>Upload Scanned Image</button>
                            <button id="text" className="switching-button" onClick={this.handleClick}>Add Text Description</button>
                        </div>
                        {(this.state.activeElement !== "image") ?
                            <AddTextDescription handleNext={this.props.handleNext} handleChange={this.props.handleChange} value={this.props.value} updateTaskDetails={this.props.updateTaskDetails} /> :
                            <UploadFile handleNext={this.props.handleNext} handleChange={this.props.handleChange} value={this.props.value} updateTaskDetails={this.props.updateTaskDetails} />}
                    </div>
                    <div className="shopping-image">
                            <img src={Shopping} />
                        </div>
                </div>
            </React.Fragment>
        )
    }
}


export default addOrderDescription