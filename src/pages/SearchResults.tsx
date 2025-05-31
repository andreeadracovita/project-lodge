import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getAllProperties } from "/src/components/api/LodgeDbApiService";
import Search from "/src/components/search/Search";
import ListView from "/src/components/ListView";
import MapView from "/src/components/MapView";

function SearchResults() {
	const [properties, setProperties] = useState([]);
	const [location, setLocation] = useState("");
	const [locationGeo, setLocationGeo] = useState([0, 0]);
	const [points, setPoints] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		getAllProperties()
			.then(response => {
				if (response.data.length > 0) {
					setProperties(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	useEffect(() => {
		setLocation(searchParams.get("destination"));
	}, [searchParams.get("destination")]);

	useEffect(() => {
		const points = [];
		properties.map(p => {
			points.push(p.geo);
		});
		setPoints(points);
		console.log(points);
	}, [properties]);

	useEffect(() => {
		axios.get(`https://geocode.maps.co/search?q=${location}&api_key=6829981227127748709913iypd29e39`)
			.then(response => {
				if (response.data.length > 0) {
					const data = response.data[0];
					setLocationGeo([data.lat, data.lon]);
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
				<h1>{location}: {properties.length} properties found</h1>
				<div className="row">
					<div className="col-8">
	        			<ListView items={properties} cols={3} />
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