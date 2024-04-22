import React from "react";
import { Link } from "react-router-dom";

function Section({ section, reverse }) {
	return (
		<section style={reverse ? {'flexDirection': 'row-reverse'} : {}}>
			<div className="image-wrapper">
				<img src={section.img}/>
			</div>
			<div className="feature-wrapper" >
				<div className="feature-title">{section.sectionName}</div>
				<div className="feature-info">
					{section.description}
				</div>
				<Link to={section.link}>
					<button>Go to page</button>
				</Link>
			</div>
		</section>
	);
}

export default Section;
