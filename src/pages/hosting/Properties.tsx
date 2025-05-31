import { useEffect, useState } from "react";

import { useAuth } from "/src/components/security/AuthContext";
import HostingHeader from "/src/components/Header/HostingHeader";
import { getUserId, getPropertiesByUserId } from "/src/components/api/LodgeDbApiService";
import ListView from "/src/components/ListView";

export default function Properties() {
	const authContext = useAuth();
	const [hostedProperties, setHostedProprties] = useState([]);

	useEffect(() => {
		getUserId()
			.then(response => {
				if (response.data) {
					const userId = response.data;

					getPropertiesByUserId(userId)
						.then(response => {
							setHostedProperties(response.data);
						})
						.catch(error => {
							// No user was found
						})
				}
			})
			.catch(error => {
				console.error(error);
			});
	});

	return (
		<div className="container section-container">
			<HostingHeader />

			<h1 className="page-heading">Properties</h1>
			<div className="row row-cols-5">
				<ListView items={hostedProperties} cols={5} />
			</div>
		</div>
	);
}
