import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

import { getPropertiesByUserId } from "/src/api/BackendApiService";

/**
 * HostingCalendarSettings retrieves all managed properties by hostId for dropdown select and sets searchParams
 * to first id in results. This approach maintains selection at page refresh.
 */
export default function HostingCalendarSettings() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [hostedProperties, setHostedProperties] = useState([]);
	const [selectedProp, setSelectedProp] = useState();

	useEffect(() => {
		getPropertiesByUserId()
			.then(response => {
				const data = response.data;
				if (data.length > 0) {
					setHostedProperties(data);
					const firstPropId = data[0].id;
					searchParams.set("id", firstPropId);
					setSearchParams(searchParams);
					const foundPropWithId = data.find(p => p.id == firstPropId);
					setSelectedProp(foundPropWithId);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function handlePropertyClick(id) {
		searchParams.set("id", id);
		setSearchParams(searchParams);
		setSelectedProp(hostedProperties.find(p => p.id == id));
	}
	
	return (
		<div className="border-section">
			<div className="text-strong">Selected property</div>
			{
				hostedProperties.length > 0 && selectedProp &&
				<div>
					<div className="dropdown">
						<div id="dropdown-properties" role="button" className="btn-pill-outline mt-10" data-bs-toggle="dropdown">
							{selectedProp?.title}
						</div>
						
						<ul className="dropdown-menu dropdown-menu-start text-small">
							{hostedProperties.map((p, i) => {
								return <li
									key={i}
									className="dropdown-item cursor-pointer"
									onClick={() => handlePropertyClick(p.id)}
								>
									{p.title}
								</li>
							})}
						</ul>
					</div>

					<div className="section-heading section-container">Price settings</div>
					<div className="mt-10">Per night: {selectedProp?.price_night_local} {selectedProp?.local_currency}</div>
					<div className="btn-text-underline">Edit price</div>
					<hr />
					<div className="btn-text-underline">Edit Availability</div>
					<hr />
					<div className="section-heading">Selected booking</div>
					<div className="btn-text-underline">View booking</div>
				</div>
			}
		</div>
	);
}