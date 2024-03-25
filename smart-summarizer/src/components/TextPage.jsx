import axios from "axios";
import { useEffect, useState } from "react";

import React from "react";

function TextPage() {
	const [text, setText] = useState("");
	const [summary, setSummary] = useState("");
	const [response, setResponse] = useState("");
	const [message, setMessage] = useState("");
	const sendData = async () => {
		try {
			axios
				.post("http://localhost:5000/processText", { text })
				.then((response) => {
					setSummary(response.data.summary);
					// console.log(response.data.summary);
				});
		} catch (error) {
			console.log("Error sending request");
		}
	};
	const chatWithBot = async () => {
		try {
			const response = await axios.post("http://127.0.0.1:5000/chat", {
				message,
			});
			// console.log(response.data.response);
			setResponse(response.data.response);
		} catch (error) {
			console.error("Error chatting with PDF:", error);
		}
	};
	const updateText = (e) => {
		setText(e.target.value);
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
					style={{ resize: "none" }}
					onChange={updateText}
				></textarea>
				<button className="submitBtn top-margin" onClick={sendData}>
					Get Summary
				</button>
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
				{summary && <p className="pdf-answer" style={{'margin': '20px 0'}}>{summary}</p>}
				{response && <p className="pdf-answer"style={{'margin': '20px 0'}}>{response}</p>}
			</div>
		</>
	);
}

export default TextPage;
