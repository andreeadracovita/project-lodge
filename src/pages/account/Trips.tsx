import { useEffect } from "react";

import { getAllBookings } from "/src/api/BackendApiService";

export default function Trips() {

	useEffect(() => {
		getAllBookings()
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.error(error);
			});
	});

	return (
		<div className="container section-container">
			<h1 className="page-heading">Trips</h1>
		</div>
	);
}
