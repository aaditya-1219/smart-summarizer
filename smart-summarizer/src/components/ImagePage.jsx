import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImagePage() {
	const [image, setImage] = useState(null);
	const [answer, setAnswer] = useState("");
	const [imageInfo, setImageInfo] = useState("");
	const [userQuery, setUserQuery] = useState("");

	const handleImageChange = (event) => {
		setImage(event.target.files[0]);
		event.target.value = "";
	};

	const expandSidebar = () => {
		const sidebar = document.getElementById("sidebar");
		const container = document.querySelector(".container");
		const imgInput = document.querySelector(".img-input");
		sidebar.classList.toggle("expandSidebar");
		container.classList.toggle("increaseMargin");
		imgInput.classList.toggle("displayNone");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("image", image);
		try {
			const response = await axios.post(
				"http://localhost:5000/uploadImg",
				formData
			);
			toast.success("Image uploaded!");
			setImageInfo(response.data.response)
		} catch (error) {
			console.error("Error uploading image:", error.message);
		}
	};

	const postQuery = async () => {
		try {
			const answer = await axios.post(
				"http://localhost:5000/imgQuery",
				{ query: userQuery }
			);
			setAnswer(answer.data.response);
		} catch (error) {
			console.log("Error occurred: ", error);
		}
	};
	return (
		<>
			<ToastContainer
				position="bottom-right"
				hideProgressBar={true}
				autoClose={2500}
			/>
			<div id="sidebar">
				<i className="fa-solid fa-bars" onClick={expandSidebar}></i>
				<div className="img-input displayNone">
					<form
						onSubmit={handleSubmit}
						// style={{ marginLeft: "3.5rem" }}
					>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="displayNone"
							id="imgInput"
						/>
						<label htmlFor="imgInput">Select file</label>
						{image && (
							<p style={{ color: "white" }}>
								Selected Image: {image.name}
							</p>
						)}
						<button type="submit">Upload Image</button>
					</form>
				</div>
				<div className="icons">
					<i className="fa-regular fa-circle-question"></i>
					<i className="fa-solid fa-gear"></i>
				</div>
			</div>
			<div className="container">
				<div className="input-wrapper queryInput">
					<input
						placeholder="Write your query here..."
						value={userQuery}
						onChange={(e) => setUserQuery(e.target.value)}
					/>
					<button className="submitBtn" onClick={postQuery}>
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
				{imageInfo && <p className="url-answer">{imageInfo}</p>}
				{answer && <p className="url-answer">{answer}</p>}
			</div>
		</>
	);
}

export default ImagePage;
