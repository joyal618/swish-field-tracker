import './ContactUs.css'
import Nav from '../../components/nav/Nav'
import Footer from '../../components/footer/Footer'
import react, { Component } from 'react';
import man from '../../resources/man.png'
import woman from '../../resources/woman.png'
import callIcon from "../../resources/phone.png"

class ContactUs extends Component {
    render() {
        return (
            <div className="contact-us-container">
                <Nav type="contact-us" />
                <div className="contact-us-wrapper">
                    <div className="contact-us-caption">Our Team is here to Help!!</div>
                    <div className="contact-us-image-container">
                        <div className="image-container-1">
                            <h1>C.E.O</h1>
                            <img src={woman} width="150" height="150" alt=""></img>
                            <div className="image-caption">
                                Sumedhaa<br />
                                <span className="email-container">sumedhaa@swish.com</span></div>
                        </div>
                        <div className="image-container-1">
                            <h1>C.T.O</h1>
                            <img src={man} width="150" height="150" alt=""></img>
                            <div className="image-caption">
                                Akshay TK<br />
                                <span className="email-container">akshay@swish.com</span></div>
                        </div>
                        <div className="image-container-1">
                            <h1>C.I.O</h1>
                            <img src={man} width="150" height="150" alt=""></img>
                            <div className="image-caption">
                                Joyal Thomas<br />
                                <span className="email-container">joyal@swish.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="contact-us-image-container">
                        <div className="image-container-1">
                            <h2>Lead Engineer</h2>
                            <img src={man} width="150" height="150" alt=""></img>
                            <div className="image-caption">
                                Ashwin P<br />
                                <span className="email-container">ashwin@swish.com</span></div>
                        </div>
                        <div className="image-container-1">
                            <h2>Lead Developer</h2>
                            <img src={man} width="150" height="150" alt=""></img>
                            <div className="image-caption">
                                Alfas<br />
                                <span className="email-container">alfas@swish.com</span></div>
                        </div>

                    </div>
                </div>

                <Footer />
            </div>

        )
    }
}
export default ContactUs;