import React, { useState } from "react";
import axios from "axios";

function ImagePage() {
	const [image, setImage] = useState(null);
	const [response, setResponse] = useState("");

	const handleImageChange = (event) => {
		setImage(event.target.files[0]);
		event.target.value = ''
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
			setResponse(response.data.response);
			console.log(response.data);
		} catch (error) {
			console.error("Error uploading image:", error.message);
		}
	};
	return (
		<>
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
						{image && <p style={{'color': 'white'}}>Selected Image: {image.name}</p>}
						<button type="submit">Upload Image</button>
					</form>
				</div>
				<div className="icons">
					<i className="fa-regular fa-circle-question"></i>
					<i className="fa-solid fa-gear"></i>
				</div>
			</div>
			<div className="container">
				{/* <h2>Upload an image</h2> */}
				{response && (<p className="pdf-answer">
					{response}
				</p>)}
			</div>
		</>
	);
}

export default ImagePage;
