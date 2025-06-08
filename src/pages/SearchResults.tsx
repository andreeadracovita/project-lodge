import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";

import { getAllProperties } from "/src/api/BackendApiService";
import Search from "/src/components/search/Search";
import ListView, { ListItemType } from "/src/components/list/ListView";
import MapView from "/src/components/map/MapView";
import Filter from "/src/components/filter/Filter";

export default function SearchResults() {
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
			points.push([p.geo.x, p.geo.y]);
		});
		setPoints(points);
	}, [properties]);

	useEffect(() => {
		const apiKey = import.meta.env.VITE_GEOCODE_API_KEY;
		axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${apiKey}`)
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
		<div className="container section-container">
			<Search />
			<div className="section-container row">
				<div className="col-3">
					<div className="position-relative">
						<MapView height={"200px"} center={locationGeo} zoom={6} points={[]} />
						<span className="btn btn-dark rounded-pill position-absolute top-50 start-50 translate-middle d-flex align-items-center">
							<span className="me-2">Show map</span><Icon.Map color="white" />
						</span>
					</div>
					<div className="section-container">
						<Filter />
					</div>
				</div>
				<div className="col-9">
					<h1 className="page-heading">{location}: {properties.length} results found</h1>
					<ListView listItemType={ListItemType.Property} items={properties} cols={3} />
				</div>
	        </div>
		</div>
	);
}
