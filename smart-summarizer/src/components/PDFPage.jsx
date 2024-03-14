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

	return (
		<div className="pdf-container">
			<h1>PDF Chat App</h1>
			<div className="pdf-wrapper">
				<div className="pdf-input">
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
				</div>
				<div className="pdf-question">
					<textarea
						placeholder="Type your message..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button onClick={chatWithPDF}>Chat with PDF</button>
				</div>
			</div>
			{response && <p className="pdf-answer">Response from Gemini AI: {response}</p>}
		</div>
	);
};

const dropzoneStyle = {
	border: "2px dashed #cccccc",
	borderRadius: "4px",
	padding: "20px",
	textAlign: "center",
	cursor: "pointer",
};

export default App;
