import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom';


const Footer = () => {

    return (
        // <div>
        //     <footer>
        //         <nav>
        //             <div className="nav-links-container">
        //                 <ul className="nav-links">
        //                     <li><a href="#about">Mission</a></li>
        //                     <li><a href="#projects">Our Work</a></li>
        //                     <NavLink to={"/Arti"}>Arti</NavLink>

        //                     <li><a href="#contact">Contact</a></li>
        //                 </ul>

        //             </div>
        //         </nav>
        //         <p>|| जय श्री राम ||</p>

        //         <p>Copyright ©Team - Misssion PawanPutra. All Rights Reserved.</p>
        //     </footer>
        // </div>
        <footer>
            <h2>Smart Summarizer</h2>
            <nav>
                <ul>
                    <a href="#">
                        <li>Features</li>
                    </a>
                    {/* <li>Mission</li>
                    <li>Our Work</li>
                    <li>Arti</li> */}
                    <li>Contact</li>
                </ul>
            </nav>
            <p>Copyright ©Team - Smart Summarizer. All Rights Reserved.</p>
        </footer>
    )
}

export default Footer