import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

const App = () => {
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");

	const onDrop = (acceptedFiles) => {
		setFile(acceptedFiles[0]);
	};

	const uploadFile = async () => {
		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await axios.post(
				"http://127.0.0.1:5000/process",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			// Handle the response from the Flask backend
			console.log(response.data);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	const chatWithPDF = async () => {
		try {
			const response = await axios.post("http://127.0.0.1:5000/chat", {
				message,
			});

			// Handle the response from Gemini AI
			setResponse(response.data.response);
		} catch (error) {
			console.error("Error chatting with PDF:", error);
		}
	};

	const expandSidebar = () => {
		const sidebar = document.getElementById("sidebar");
		const container = document.querySelector(".container");
		const pdfInput = document.querySelector(".pdf-input");
		sidebar.classList.toggle("expandSidebar");
		container.classList.toggle("increaseMargin");
		pdfInput.classList.toggle("displayNone");
	};

	return (
		<>
			<div id="sidebar">
				<i class="fa-solid fa-bars" onClick={expandSidebar}></i>
				<div className="pdf-input displayNone">
						<Dropzone onDrop={onDrop}>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps()} style={dropzoneStyle}>
									<input {...getInputProps()} />
									<p>
										Drag & drop a PDF file here
										<br />
										or click here to select one
										<br />
										<span style={{'color': 'rgba(0,0,0,0.5)', 'fontSize': 'smaller'}}>Limit 200MB</span>
										
									</p>
								</div>
							)}
						</Dropzone>
					{file && <p style={{'color': 'white'}}>Selected File: {file.name}</p>}
					<button onClick={uploadFile}>Upload PDF</button>
				</div>
				<div className="icons">
					<i class="fa-regular fa-circle-question"></i>
					<i class="fa-solid fa-gear"></i>
				</div>
			</div>
			<div className="container">
				{/* <h1>PDF Chat App</h1> */}
				<div className="wrapper">
					{/* <div className="pdf-input">
						<Dropzone onDrop={onDrop}>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps()} style={dropzoneStyle}>
									<input {...getInputProps()} />
									<p>
										Drag & drop a PDF file here, or click to
										select one
									</p>
								</div>
							)}
						</Dropzone>
						{file && <p>Selected File: {file.name}</p>}
						<button onClick={uploadFile}>Upload PDF</button>
					</div> */}
					<div className="input-wrapper">
						<input
							placeholder="Write your query here..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button className="submitBtn" onClick={chatWithPDF}>
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
				</div>
				{response && (
					<p className="pdf-answer">
						Response from Gemini AI: {response}
					</p>
				)}
			</div>
		</>
	);
};

const dropzoneStyle = {
	// border: "2px dashed #cccccc",
	overflow: "hidden",
	backgroundColor: "#B6BBC4",
	borderRadius: "4px",
	padding: "15px",
	// textAlign: "center",
	cursor: "pointer",
};

export default App;
