import { Link } from "react-router-dom";
import "./Home.css"; // Make sure to create this file and paste the CSS code below

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Doctor A's Reservation App</h1>
                <p>Your health, our priority. Book your appointment with ease.</p>
                <Link to="/doctors" className="reserve-btn">
                    Reserve Now
                </Link>
            </header>
            <section className="features-section">
                <div className="feature-card">
                    <img src="https://img.icons8.com/ios-filled/100/4a90e2/doctor-male.png" alt="Doctor" />
                    <h3>Expert Care</h3>
                    <p>Consult with experienced and caring professionals.</p>
                </div>
                <div className="feature-card">
                    <img src="https://img.icons8.com/ios-filled/100/4a90e2/calendar.png" alt="Calendar" />
                    <h3>Easy Booking</h3>
                    <p>Reserve your slot in just a few clicks, anytime, anywhere.</p>
                </div>
                <div className="feature-card">
                    <img src="https://img.icons8.com/ios-filled/100/4a90e2/clock.png" alt="Clock" />
                    <h3>Flexible Schedule</h3>
                    <p>Choose a time that fits your busy life.</p>
                </div>
            </section>
            <footer className="home-footer">
                <p>&copy; {new Date().getFullYear()} Doctor A Reservation App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;