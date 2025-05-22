import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";

import Search from "/src/components/Header/Search";
import ListView from "/src/components/ListView";
import MapView from "/src/components/MapView";
import properties from "../Properties.json";

function SearchResults() {
	const propertiesNo = 100;
	const [location, setLocation] = useState("");
	const [locationGeo, setLocationGeo] = useState([0, 0]); // [lat, lon]
	const [points, setPoints] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setLocation(searchParams.get("destination"));
		const points = [];
		properties.map((p) => {
			points.push(p["location"]);
		});
		setPoints(points);
	}, [searchParams.get("destination")]);

	useEffect(() => {
		axios.get(`https://geocode.maps.co/search?q=${location}&api_key=6829981227127748709913iypd29e39`)
			.then(response => {
				if (response.data.length > 0) {
					const data = response.data[0];
					setLocationGeo([Number(data.lon), Number(data.lat)]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, [location]);

	return (
		<div className="container">
			<Search />
			<div className="mt-3">
				<h1>{location}: {propertiesNo} properties found</h1>
				<div className="row">
					<div className="col-8">
	        			<ListView properties={properties} />
	        		</div>
	        		<div className="col-4">
	        			<MapView height={"650px"} center={locationGeo} zoom={6} points={points} />
	        		</div>
	        	</div>
	        </div>
		</div>
	);
}

export default SearchResults;