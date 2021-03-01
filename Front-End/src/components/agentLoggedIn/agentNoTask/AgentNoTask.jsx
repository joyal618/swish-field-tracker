import React, { Component } from 'react';
import './AgentNoTask.css';

class AgentNoTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <React.Fragment>
                {/* <Nav /> */}
                <div className="agent-no-task">
                    <h2>No tasks assigned to you. Please wait!!</h2>

                </div>
            </React.Fragment>
        )
    }


}

export default AgentNoTask