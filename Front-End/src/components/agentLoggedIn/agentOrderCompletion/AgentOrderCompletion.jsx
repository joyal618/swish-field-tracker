import React, { Component } from 'react';
import './AgentOrderCompletion.css';

class AgentOrderCompletion extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render() {
        return (
            <React.Fragment>
                {/* <Nav /> */}
                <div className="agent-order-confirmation">
                    <h2>Order Completed Successfully</h2>

                </div>
            </React.Fragment>
        )
    }


}

export default AgentOrderCompletion