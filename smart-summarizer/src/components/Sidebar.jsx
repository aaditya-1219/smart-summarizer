import React from "react";
import "./Sidebar.css";

function Sidebar() {
	return (
		<div id="sidebar">
            <i class="fa-solid fa-bars"></i>
			<div className="icons">
				<i class="fa-regular fa-circle-question"></i>
				<i class="fa-solid fa-gear"></i>
			</div>
		</div>
	);
}

export default Sidebar;
