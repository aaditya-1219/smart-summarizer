import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Pages.css";

import React from "react";

function Home() {
	const [url, setUrl] = useState("");
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");
	const sendData = async () => {
		try {
			axios
				.post("http://localhost:5000/summarizeUrl", { url })
				.then((response) => console.log(response.data));
		} catch (error) {
			console.log("Error sending request");
		}
	};
	return (
		<div className="url-container">
			<h1>URL Summarizer</h1>
			<div className="pdf-wrapper">
				<div className="url-wrapper">
					<input type="text" placeholder="Paste link here" />
					<button className="submitBtn">Submit</button>
				</div>
				<div className="url-question">
					<textarea
						placeholder="Type your message..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button>Chat with ChatBot</button>
				</div>
			</div>
			{response && (
				<p className="url-answer">
					{response}
				</p>
			)}
		</div>
	);
}

export default Home;
