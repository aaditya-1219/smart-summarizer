import "./App.css";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import PDFPage from "./components/PDFPage";
import TextPage from "./components/TextPage";
import URLPage from "./components/URLPage";
import ImagePage from "./components/ImagePage";
import Navbar from "./components/Navbar";

function App() {
	// const [url, setUrl] = useState("");
	// const sendData = async () => {
	// 	try {
	// 		axios
	// 			.post("http://localhost:5000/api/endpoint", { url })
	// 			.then((response) => console.log(response.data));
	// 	} catch (error) {
	// 		console.log("Error sending request");
	// 	}
	// };
	return (
		<>
			<div className="main-container">
				<Navbar />
				<div className="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/urlpage" element={<URLPage />} />
						<Route path="/pdfpage" element={<PDFPage />} />
						<Route path="/textpage" element={<TextPage />} />
						<Route path="/imagepage" element={<ImagePage />} />
					</Routes>
				</div>
			</div>
		</>
	);
}

export default App;
