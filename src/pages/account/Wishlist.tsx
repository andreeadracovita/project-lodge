import { useEffect, useState } from "react";

import { getAllWishlisted } from "/src/api/LodgeDbApiService";

export default function Wishlist() {
	const [propertyIds, setPropertyIds] = useState([]);

	useEffect(() => {
		getAllWishlisted()
			.then(response => {
				if (response.data.length > 0) {
					setPropertyIds(response.data); 
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	return (
		<div className="container section-container">
			<h1 className="page-heading">Wishlist</h1>

		</div>
	);
}
