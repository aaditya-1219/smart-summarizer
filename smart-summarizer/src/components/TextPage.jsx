import axios from "axios";
import { useEffect, useState } from "react";

import React from "react";

function Page2() {
	const [url, setUrl] = useState("");
	const sendData = async () => {
		try {
			axios
				.post("http://localhost:5000/api/endpoint", { url })
				.then((response) => console.log(response.data));
		} catch (error) {
			console.log("Error sending request");
		}
	};
	const expandSidebar = (e) => {
		const element = document.getElementById("sidebar");
		if (element.style.width === "3.5rem") element.style.width = "30vw";
		else element.style.width = "3.5rem";
	};
	return (
		<>
			<div id="sidebar">
				<i class="fa-solid fa-bars" onClick={expandSidebar}></i>
				<div className="icons">
					<i class="fa-regular fa-circle-question"></i>
					<i class="fa-solid fa-gear"></i>
				</div>
			</div>
			<div className="container">
				<textarea
					name="textArea"
					id="textArea"
					cols="60"
					rows="10"
					placeholder="Paste text here"
				></textarea>
				<button className="submitBtn">Submit</button>
			</div>
		</>
	);
}

export default Page2;
