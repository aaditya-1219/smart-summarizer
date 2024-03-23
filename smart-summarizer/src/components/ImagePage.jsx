import React, { useState } from "react";
import axios from "axios";

function ImagePage() {
	const [image, setImage] = useState(null);

	// Function to handle file input change
	const handleImageChange = (event) => {
		setImage(event.target.files[0]);
	};

	// Function to handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Create form data
		const formData = new FormData();
		formData.append("image", image);

		// Send POST request to server
		try {
			const response = await axios.post(
				"http://localhost:5000/uploadImg",
				formData
			);
			console.log(response.data);
		} catch (error) {
			console.error("Error uploading image:", error.message);
		}
	};
	return (
		<>
			<div id="sidebar">
				<i className="fa-solid fa-bars" ></i>
				<div className="icons">
					<i className="fa-regular fa-circle-question"></i>
					<i className="fa-solid fa-gear"></i>
				</div>
			</div>
			<form onSubmit={handleSubmit} style={{'marginLeft': '3.5rem'}}>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
				/>
				<button type="submit">Upload Image</button>
			</form>
		</>
	);
}

export default ImagePage;
