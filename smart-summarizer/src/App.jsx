import "./App.css";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import PDFPage from "./components/PDFPage";
import TextPage from "./components/TextPage"
import URLPage from "./components/URLPage";
import Sidebar from "./components/Sidebar";
import "./components/Sidebar.css"

function App() {
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
		<>
			<div className="main-container">
				<Sidebar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/urlpage" element={<URLPage />} />
					<Route path="/pdfpage" element={<PDFPage />} />
					<Route path="/textpage" element={<TextPage />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
