import "./Home.css";
import React from "react";
import Section from "./Section";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import pdfPath from "../assets/pdf.png"
import imagePath from "../assets/image.jpeg"
import textPath from "../assets/text.png"
import linkPath from "../assets/link.png"

function Home() {
	// const expandSidebar = (e) => {
	// 	const element = document.getElementById("sidebar");
	// 	if (element.style.width === "3.5rem") element.style.width = "30vw";
	// 	else element.style.width = "3.5rem";
	// };
	const sections = [
		{
			sectionName: "Website Summary",
			description: "Paste the link of any website and click on 'Generate Summary' to get the summary of the content available on the website. This model is slightly heavy-weight so it will take a few minutes to generate your response, so be patient.",
			link: "/urlpage",
			img: pdfPath, 
		},
		{
			description: "Paste the text of any article and click on 'Generate Summary' to get the summary of the content. This model is slightly heavy-weight so it will take a few minutes to generate your response, so be patient.",
			sectionName: "Text Summary",
			link: "/textpage",
			img: textPath
		},
		{
			sectionName: "Chat with PDF",
			description: "Upload multiple PDF files and wait till a notification like 'PDF uploaded'. You can ask the questions related to multiple PDF files. Make sure the answer to the question asked is available in the PDF. You may also ask general questions like 'Summarize my document' or get the number of occurrences of any word. This model is slightly heavy-weight so it will take a few minutes to generate your response, so be patient while the answer is generating.",
			link: "/pdfpage",
			img: linkPath
		},
		{
			sectionName: "Upload Image",
			description: "You can upload an image and get the relevant information about it. You may ask questions related to the image and get the relevant information that you are looking for. For example - if you uploaded an image of a product, you can ask the price of that product, specifications etc. This model is slightly heavy-weight so it will take a few minutes to generate your response, so be patient while the answer is generating.",
			link: "/imagepage",
			img: imagePath

		}
	];
	return (
		<>
			{/* <div id="sidebar">
				<i class="fa-solid fa-bars"></i>
				<div className="icons">
					<i class="fa-regular fa-circle-question"></i>
					<i class="fa-solid fa-gear"></i>
				</div>
			</div> */}
			<div className="home-container">
				 {/* <h1>Smart Summarizer</h1> */}
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
						<Link to="/imagepage">
							<div className="route-box">
								Upload Image	
								<i class="fa-solid fa-image"></i>
							</div>
						</Link>
					</div>
				</div>
				{sections.map((section, index) => {
					return (
						<Section
							key={index}
							reverse={index % 2 ? true : false}
							section={section}
						/>
					);
				})}
			</div>
			<Footer />
		</>
	);
}

export default Home;
