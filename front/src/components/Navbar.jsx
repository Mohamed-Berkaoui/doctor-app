import { Link } from "react-router-dom";
import "./Navbar.css"
import { useDoctor } from "../context/DoctorContext";

const Navbar = () => {
    const {logout, token} = useDoctor();
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="navbar-icon" aria-label="Doctor Icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" stroke="#2d8cf0" strokeWidth="2" />
                        <rect x="6" y="14" width="12" height="6" rx="3" stroke="#2d8cf0" strokeWidth="2" />
                        <path d="M12 14v-2" stroke="#2d8cf0" strokeWidth="2" strokeLinecap="round" />
                        <path d="M9 18h6" stroke="#2d8cf0" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </span>
                <span className="navbar-title">DoctorApp</span>
            </div>
            <ul className="navbar-right">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/doctors">Our Doctors</Link></li>
               {!token? <li ><Link to="/dashboard/register" style={{fontSize:"0.7rem",color:"wheat"}}>join our doctors community</Link></li>
            :
               <><li><Link to="/dashboard/doctor" style={{fontSize:"1.2rem",color:"wheat"}}>Dashboard</Link></li>
          
           
                    <li>
                        <button className="logout-btn" onClick={logout}>Logout</button>
                    </li>
</> 
            }
            </ul>
        </nav>
    );
};

export default Navbar;