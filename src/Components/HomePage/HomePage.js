import './homepage.css'
import Header from '../Header/Header';

const HomePage = () => {
    return (
       <>
        <div className="welcome-text">
            <div className="welcome-text_text">Welcome to</div>
            <div className="welcome-text_company-name">
                <span>My</span>
                <span>Jobs</span>
            </div>
        </div>
        <div className="home-img"></div>
        <div className="section_wrapper">
            <section>
                <h3 className="section_heading">Why Us</h3>
                <div className="cards">{whyUs()}</div>
            </section>
            <section>
                <h3 className="section_heading">Companies Who Trust Us</h3>
                <div className="companies-logo">
                    <div className="solaytic"></div>
                    <div className="bmw"></div>
                    <div className="flipcart"></div>
                    <div className="disney"></div>
                    <div className="dell"></div>
                    <div className="airtel"></div>
                    <div className="macd"></div>
                    <div className="samsung"></div>
                    <div className="audi"></div>
                </div>
            </section>
        </div>
        </> 
    )
} 

const whyUs = () => {
    var headings = ["Get More Visiblity","Organize Your Candidates","Verify Their Abilities"];
    var card = headings.map((heading,index) => {
        return <div key={index} className="card">
            <h4 className="card_heading">{heading}</h4>
            <p className="card_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non faucibus ante, et viverra lorem. Sed quis vehicula sem, nec fringilla ipsum. </p>
        </div>
    });
    return card; 
}

export default HomePage;