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
	const [selectedPropId, setSelectedPropId] = useState();

	useEffect(() => {
		getPropertiesByUserId()
			.then(response => {
				const data = response.data;
				if (data.length > 0) {
					setHostedProperties(data);
					if (!searchParams.get("id")) {
						searchParams.set("id", data[0].id);
						setSearchParams(searchParams);
					}
					setSelectedPropId(searchParams.get("id") ?? data[0].id);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, [])

	function handlePropertyClick(id) {
		searchParams.set("id", id);
		setSearchParams(searchParams);
		setSelectedPropId(id);
	}
	
	return (
		<div className="border-section">
			<div className="text-strong">Selected property</div>
			{
				hostedProperties.length > 0 && selectedPropId &&
				<div className="dropdown">
					<div id="dropdown-properties" role="button" className="btn-pill-outline mt-10" data-bs-toggle="dropdown">
						{hostedProperties.find(p => p.id == selectedPropId)?.title}
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
			}
		</div>
	);
}