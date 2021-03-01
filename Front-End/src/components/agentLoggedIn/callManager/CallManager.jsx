import React, { Component } from 'react';
import Nav from '../../nav/Nav';
import './CallManager.css';
import axios from 'axios'
import callIcon from "../../../resources/phone.png"

class CallManager extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <React.Fragment>
                {/* <Nav /> */}
                <div className="call-manager">
                    <h1>Call Manager<br /></h1>
                    <h2>
                        <a>
                            <img src={callIcon} width="20" height="20"></img>
                        </a>
                            7846189877
                        </h2>

                </div>
            </React.Fragment>
        )
    }


}

export default CallManager