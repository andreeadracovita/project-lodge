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
			<div className="d-flex align-items-center">
				<p className="m-0">Select collection:</p>
				<button className="btn-pill-outline ms-2">[Name]</button>
				<button className="btn-pill ms-2">Create a collection</button>
			</div>
			<div className="row">
				<div className="col-8">
					
					<h1 className="page-heading">[Collection name]</h1>
				</div>
				<div className="col-4 d-flex justify-content-end">
					<MapView height={"70px"} width={"180px"} center={center} zoom={14} points={[]} />
				</div>
			</div>
			<div className="section-container">
				<h1 className="page-heading">All wishlists [TODO collections]</h1>
				<ListView listItemType={ListItemType.Property} items={properties} cols={4} />
			</div>
		</div>
	);
}
