import './AboutUs.css'

// import image1 from '../../resources/andrew-kambel-lmEpGmZuaLg-unsplash.jpg'
// import image2 from '../../resources/ayub-bebo-cI74Hs3gOpo-unsplash.jpg'

function AboutUs() {
    return (
        <div id="about-us" className="container">
            <div className="about-us-container">
                <div className="about-us-content">
                    <div>About Us</div>
                    <div className="about-content-box">
                    <p>It all began when a young group of friends wanted to do something to help people and put a smile across their face. <br/> This led to the inception of Swish where we specialize in the delivery of all goods ranging from food items to large scale machineries. Today we are one of the world's leading delivery agency with more than 100 branches spanning multiple countries. Our core theme is to deliver happiness and ensure that our customers receive the best of the best experience.</p>
                    </div>
                </div>
                <div className="about-us-image">
                    {/* <img src={image2} width="1380" height="800" alt="nfhftuhj" /> */}
                </div>
            </div>
        </div>
    )
}

export default AboutUs;