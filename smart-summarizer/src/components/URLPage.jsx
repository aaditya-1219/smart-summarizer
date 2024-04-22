import axios from "axios";
import { useEffect, useState } from "react";
import "./Pages.css";

import React from "react";

function Home() {
	const [url, setUrl] = useState("");
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);
	const [answer, setAnswer] = useState([]);
	const sendData = async () => {
		setLoading(true);
		try {
			axios
				.post("http://localhost:5000/summarizeUrl", { url })
				.then((response) => {
					setResponse(response.data.summary);
					setLoading(false);
					// console.log(response.data)
				});
		} catch (error) {
			console.log("Error sending request");
			setLoading(false);
		}
	};

	const chatWithBot = async () => {
		try {
			const response = await axios.post("http://127.0.0.1:5000/chat", {
				message,
			});

			// Handle the response from Gemini AI
			let ans = response.data.response;
			let lines = ans.split("\n");
			setAnswer(lines);
		} catch (error) {
			console.error("Error chatting with PDF:", error);
		}
	};

	const expandSidebar = () => {
		const sidebar = document.getElementById("sidebar");
		const container = document.querySelector(".container");
		const urlQuestion = document.querySelector(".url-question");
		sidebar.classList.toggle("expandSidebar");
		container.classList.toggle("increaseMargin");
		urlQuestion.classList.toggle("displayNone");
	};

	return (
		// URL : https://www.nationalgeographic.com/environment/article/global-warming-effects
		<>
			<div id="sidebar">
				<i className="fa-solid fa-bars" onClick={expandSidebar}></i>
				<div className="url-question displayNone">
					<input
						type="text"
						placeholder="Paste link here..."
						onChange={(e) => setUrl(e.target.value)}
					/>
					<button onClick={sendData}>
						{/* <svg
							width="32"
							height="25"
							viewBox="0 0 32 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11.6432 16.826H19.4053V10.826H24.5801L15.5243 3.82605L6.46851 10.826H11.6432V16.826ZM15.5243 6.65605L18.3316 8.82605H16.818V14.826H14.2306V8.82605H12.717L15.5243 6.65605ZM6.46851 18.826H24.5801V20.826H6.46851V18.826Z"
								fill="black"
							/>
						</svg> */}
						Upload
					</button>
				</div>
				<div className="icons">
					<i className="fa-regular fa-circle-question"></i>
					<i className="fa-solid fa-gear"></i>
				</div>
			</div>
			<div className="container">
				{/* <h1>URL Summarizer</h1> */}
				{/* <p>
					https://www.nationalgeographic.com/environment/article/global-warming-effects
				</p> */}
				<div className="wrapper">
					<div className="input-wrapper">
						<input
							placeholder="Write your query here..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button className="submitBtn" onClick={chatWithBot}>
							<div className="sendIcon">
								<svg
									width="34"
									height="30"
									viewBox="0 0 34 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M31.8008 13.2176L5.19381 1.19111C2.95941 0.178614 0.372211 1.93197 1.07781 3.98166L4.72341 14.6993C4.87041 15.1439 4.87041 15.5884 4.72341 16.0329L1.07781 26.7506C0.372211 28.8003 2.95941 30.5536 5.19381 29.5411L31.8008 17.5146C32.2547 17.3063 32.6335 16.9991 32.8974 16.6254C33.1613 16.2518 33.3005 15.8253 33.3005 15.3908C33.3005 14.9563 33.1613 14.5299 32.8974 14.1562C32.6335 13.7825 32.2547 13.4754 31.8008 13.267V13.2176Z"
										fill="black"
									/>
								</svg>
							</div>
						</button>
					</div>
					{/* <div className="url-question">
						<textarea
							placeholder="Type your message..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button onClick={chatWithPDF}>Chat with ChatBot</button>
					</div> */}
				</div>
				{response && <p className="url-answer">{response}</p>}
				{answer.length > 0 && (
					<p className="url-answer">
						{answer.map((line, index) => (
							<React.Fragment key={index}>
								{line}
								<br />
							</React.Fragment>
						))}
					</p>
				)}
			</div>
			{loading && (
				<div className="loading-container">
					<h1>Generating your summary...</h1>
				</div>
			)}
		</>
	);
}

export default Home;
