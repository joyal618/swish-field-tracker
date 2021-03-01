import './Customers.css'
import customer1 from '../../resources/remy-gieling-7Hrvi05nnQU-unsplash.jpg'
import customer2 from '../../resources/krakenimages-KzRz25tmjWc-unsplash.jpg'
import customer3 from '../../resources/ahmed-carter-s19SLYuhAiQ-unsplash.jpg'


function Customers() {
    return (
        <div className="container">
            <div className="caption">
                Our Happy Customers!
            </div>
            <div className="customer-container">
                <div className="customer">
                    <img src={customer1} width="200" height="300" alt="nfhftuhj" />
                    <div className="comment">“The Best ever Delivery Service”</div>
                    <div className="name"> - Chris Williams</div>
                </div>
                <div className="customer">
                    <img src={customer2} width="200" height="300" alt="nfhftuhj" />
                    <div className="comment"> “Easy and quick to use”</div>
                    <div className="name"> - Mike Ross</div>
                </div>
                <div className="customer">
                    <img src={customer3} width="200" height="300" alt="nfhftuhj" />
                    <div className="comment"> “Always prompt and friendly service”</div>
                    <div className="name"> - Harvey Specter</div>
                </div>
            </div>
        </div>
    )
}

export default Customers;