import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import { getAllWishlisted } from "/src/api/BackendApiService";
import ListView, { ListItemType } from "/src/components/list/ListView";
import MapView from "/src/components/map/MapView";

export default function Wishlist() {
	const [properties, setProperties] = useState([]);
	const center = [47.36264, 8.55256];

	useEffect(() => {
		getAllWishlisted()
			.then(response => {
				if (response.data.length > 0) {
					setProperties(response.data); 
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	return (
		<div className="container section-container">
			<h1 className="page-heading">Wishlist</h1>
			<ListView listItemType={ListItemType.Property} items={properties} cols={4} />
		</div>
	);
}
