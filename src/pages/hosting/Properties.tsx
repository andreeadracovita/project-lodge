import { useEffect, useState } from "react";

import { useAuth } from "/src/components/security/AuthContext";
import HostingHeader from "/src/components/common/header/HostingHeader";
import { getPropertiesByUserId } from "/src/api/BackendApiService";
import ListView, { ListItemType } from "/src/components/list/ListView";

// Page path: /hosting/properties
export default function Properties() {
	const authContext = useAuth();
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
			<HostingHeader />
			<h1 className="page-heading">Properties</h1>
			<ListView listItemType={ListItemType.HostingProperty} items={hostedProperties} cols={3} setNeedsRefresh={setNeedsRefresh} />
		</div>
	);
}
