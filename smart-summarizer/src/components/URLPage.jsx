import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Pages.css";

import React from "react";

function Home() {
	const [url, setUrl] = useState("");
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);
	const sendData = async () => {
		setLoading(true)
		try {
			axios
				.post("http://localhost:5000/summarizeUrl", { url })
				.then((response) => {
					setResponse(response.data.summary);
					setLoading(false)
					// console.log(response.data)
				});
		} catch (error) {
			console.log("Error sending request");
			setLoading(false)
		}
	};
	return (
		// URL : https://www.nationalgeographic.com/environment/article/global-warming-effects
		<>
			<div className="url-container">
				<h1>URL Summarizer</h1>
				<p>
					https://www.nationalgeographic.com/environment/article/global-warming-effects
				</p>
				<div className="pdf-wrapper">
					<div className="url-wrapper">
						<input
							type="text"
							placeholder="Paste link here"
							onChange={(e) => setUrl(e.target.value)}
						/>
						<button className="submitBtn" onClick={sendData}>
							Submit
						</button>
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
				{response && <p className="url-answer">{response}</p>}
			</div>
			{/* {loading && (
				<div className="loading-container">
					<h1>Generating your summary...</h1>
				</div>
			)} */}
		</>
	);
}

export default Home;
