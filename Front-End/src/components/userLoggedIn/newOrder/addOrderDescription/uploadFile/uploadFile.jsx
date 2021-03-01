import React, { Component } from 'react';
import './uploadFile.css'
// import 'antd/dist/antd.css';


export default class uploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = { displayFile: false }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleNext();
    }
    handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            let data = {
                file: file,
                imagePreviewUrl: reader.result
            };
            this.props.handleChange(e, data)
        }
        reader.readAsDataURL(file)
    }
    render() {
        let { imagePreviewUrl } = this.props.value;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div>
                <div className="order-form-container">
                    <form onSubmit={this.handleSubmit} className="order-form">
                        <input type="file" required id="order-choose-file" name="file" onChange={this.handleImageChange} />
                        <div>
                            <div>
                            <button type="preview" onClick={(e) => { e.preventDefault(); this.setState({ displayFile: true }) }} id="order-next-button">PREVIEW</button>
                            {this.state.displayFile && <div className="imgPreview">{$imagePreview}</div>}
                            </div>
                            <button type="submit" id="order-next-button">NEXT</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const fileList = [];

