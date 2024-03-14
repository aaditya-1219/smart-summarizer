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
	return (
		<div className="input-container">
			<textarea
				name="textArea"
				id="textArea"
				cols="60"
				rows="10"
				placeholder="Paste text here"
			></textarea>
			<button className="submitBtn">Submit</button>
		</div>
	);
}

export default Page2;
