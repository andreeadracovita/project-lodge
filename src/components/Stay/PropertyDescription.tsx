import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import MapView from "/src/components/MapView";
import AvailabilitySection from "./AvailabilitySection";

import "./PropertyDescription.css";

function PropertyDescription({property}) {
	const [features, setFeatures] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();

	const checkIn = searchParams.get("check_in");
	const checkOut = searchParams.get("check_out");

	useEffect(() => {
		axios.get("http://localhost:3000/features")
			.then(response => {
				if (response.data) {
					setFeatures(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<>
			<h2>About this property</h2>
			<p>
				{property.description.replace('\n', <br />)}
			</p>
			<p className="btn btn-outline-dark rounded-pill">Show more</p>
			{/*<p className="btn btn-outline-dark rounded-pill">Show less</p>*/}
			<hr />
			<h2>Features</h2>
			<div>
				{
					property.features_ids.map((feature, i) => {
						const foundFeature = features.find(f => f.id == feature);
						if (foundFeature) {
							return <span key={i} className="features-list-item">{foundFeature.name}</span>
						}
					})
				}
			</div>
			<hr />
			<AvailabilitySection />
			<hr />
			<h2>Review section</h2>
			<h2>[Stars here]</h2>
			<h2>[Reviews here]</h2>
			<hr />
			<h2>Area</h2>
			<MapView height={"350px"} center={property.geo} zoom={14} points={[property.geo]} />
		</>
	);
}

export default PropertyDescription;