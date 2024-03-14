import { Routes, Route, Link } from "react-router-dom";
import "./Home.css";
import React from "react";

function Home() {
	return (
		<div className="home-container">
			<h1>Smart Summarizer</h1>
			<div className="box-container">
				<div className="greetings">
					<h2>Hello user</h2>
					<h2>How can I help you today?</h2>
				</div>
				<div className="box-wrapper">
					<Link to="/urlpage">
						<div className="route-box">
							Paste Link
							<i className="fa-solid fa-link"></i>
						</div>
					</Link>
					<Link to="/pdfpage">
						<div className="route-box">
							Upload PDF
							<i className="fa-solid fa-file-pdf"></i>
						</div>
					</Link>
					<Link to="/textpage">
						<div className="route-box">
							Paste Text
							<i className="fa-solid fa-font"></i>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;

