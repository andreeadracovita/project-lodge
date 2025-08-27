import { useEffect, useState } from "react";

import HostingHeader, { HostingTab } from "components/hosting/HostingHeader";
import { getPropertiesByUserId } from "api/BackendApiService";
import ListView from "components/list/ListView";
import { ListItemType } from "components/list/ListItemType";

// Page path: /hosting/properties
export default function Properties() {
	const [hostedProperties, setHostedProperties] = useState([]);
	const [needsRefresh, setNeedsRefresh] = useState(false);

	useEffect(() => {
		setNeedsRefresh(false);
		getPropertiesByUserId()
			.then(response => {
				if (response.data) {
					setHostedProperties(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, [needsRefresh === true]);

	return (
		<div className="container section-container">
			<HostingHeader current={HostingTab.Properties} />

			<div className="section-container">
				<h1 className="page-heading">Properties</h1>
				<div className="mt-10">
					<ListView
						listItemType={ListItemType.HostingProperty}
						items={hostedProperties}
						cols={3}
						setNeedsRefresh={setNeedsRefresh}
						checkIn={undefined}
						checkOut={undefined}
						nightsCount={undefined}
						guests={undefined}
						isCompact={undefined}
					/>
				</div>
			</div>
		</div>
	);
}
