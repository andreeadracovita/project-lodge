import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getPropertyById } from "/src/api/BackendApiService";
import ReviewForm from "/src/components/review/ReviewForm";
import PropertyListItem from "/src/components/list/PropertyListItem";

export default function Review() {
	const [searchParams, setSearchParams] = useSearchParams();
	const propertyId = searchParams.get("id");
	const [property, setProperty] = useState();

	useEffect(() => {
		if (!propertyId) {
			return;
		}

		getPropertyById(propertyId)
			.then(response => {
				if (response.data?.length > 0) {
					setProperty(response.data[0]);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);
	
	return (
		<div className="container section-container">
		{
			property &&
			<div className="row">
				<div className="col-3">
					<PropertyListItem
						isPreview={true}
						item={property}
						hideWishlist={true}
						hidePrice={true}
					/>
				</div>
				<div className="col-9">
					<h1 className="page-heading">Review your stay</h1>
					<ReviewForm />
				</div>
			</div>
		}
		</div>
	);
}