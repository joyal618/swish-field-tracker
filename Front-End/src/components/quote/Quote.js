import './Quote.css'
//import icon from "../../resources/quote marks.png"
import Responsibility from '../../resources/responsibility_white.png'
import Respect from '../../resources/respect_white.png'
import Growth from '../../resources/growth_white.png'



function Quote() {
    return (
        <div className="values">
            {/* <div className="icon-1">
                <img src={icon} width="100" height="100" alt="nfhftuhj" />
            </div> */}
            <div className="content-container">
                <div className="content">
                    Our Values
                </div>
                <div className="quote">There is always room for those who can be relied upon to delivery the good when they say they will.</div>
                <div className="values-container">
                    <div className="value-wrapper">
                        <div><img src={Respect} width="100" height="100"/></div>
                        <div className="value-name">Respect</div>
                        <div className="value-desc">Treating each customer with dignity and courtesy</div>
                    </div>
                    <div className="value-wrapper">
                        <div><img src={Responsibility} width="100" height="100"/></div>
                        <div className="value-name">Responsibility</div>
                        <div className="value-desc">Holding themselves accountable for their performance.</div>
                    </div>
                    <div className="value-wrapper">
                        <div><img src={Growth} width="100" height="100"/></div>
                        <div className="value-name">Growth</div>
                        <div className="value-desc">Focusing on constant innovations and creativity.</div>
                    </div>

                </div>
            </div>
            {/* <div className="icon-2">
                <img src={icon} width="100" height="100" alt="nfhftuhj" />
            </div> */}
        </div>
    )
}

export default Quote;
