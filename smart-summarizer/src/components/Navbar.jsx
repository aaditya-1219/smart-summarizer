import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div id="navbar">
			<Link to={"/"}>
				<li>Contact Us</li>
			</Link>
		</div>
	);
}

export default Navbar;
