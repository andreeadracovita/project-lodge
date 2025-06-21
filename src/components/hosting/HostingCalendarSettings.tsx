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
						searchParams.set("id", data[1].id); // 0
						setSearchParams(searchParams);
					}
					setSelectedPropId(data[1].id); // 0
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, [])

	function handlePropertyClick(event) {

	}
	
	return (
		<div className="border-section">
			<div className="text-strong">Selected property</div>
			{
				hostedProperties.length > 0 && selectedPropId &&
				<div>
					<div className="btn-pill-outline mt-10">{hostedProperties.find(p => p.id === selectedPropId)?.title}</div>
					<div>[Dropdown with properties, first selected by default]</div>
				</div>
			}
		</div>
	);
}