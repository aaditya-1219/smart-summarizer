import React from "react";

function Sidebar() {
	const expandSidebar = (e) => {
		const element = document.getElementById('sidebar');
		if(element.style.width==='3.5rem') element.style.width = '30vw'
		else element.style.width = '3.5rem'
	}
	return (
		<div id="sidebar" >
            <i class="fa-solid fa-bars"onClick={expandSidebar}></i>
			<div className="icons">
				<i class="fa-regular fa-circle-question"></i>
				<i class="fa-solid fa-gear"></i>
			</div>
		</div>
	);
}

export default Sidebar;
