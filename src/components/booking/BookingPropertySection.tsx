import { useEffect, useState } from "react";
import countries from "react-select-country-list";

import { getAllFeatures } from "api/BackendApiService";
import Rating from "components/common/Rating";
import Feature from "components/common/Feature";

type BookingPropertySectionProps = {
	item: any
};

export default function BookingPropertySection({ item }: BookingPropertySectionProps) {
	const [features, setFeatures] = useState([]);

	useEffect(() => {
		getAllFeatures()
			.then(response => {
				if (response.data) {
					setFeatures(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	
	return (
		<div className="border-section">
			<h2 className="property-card-heading">{item.title}</h2>
			<div className="mt-10">{item.city}, {item.street} {item.street_no}, {countries().getLabel(item.country)}</div>
			<div className="mt-6">
				<Rating score={item.rating} reviewsNo={item.reviews_no} />
			</div>
			<div id="features-section" className="mt-6 d-flex flex-wrap">
				{
					item.features_ids.map((id: number, i: number) => {
						const foundFeature: any = features.find((feat: any) => feat.id == id);
						if (foundFeature) {
							return <div key={i} className="me-2">
								<Feature name={foundFeature.name} />
							</div>
						}
					})
				}
			</div>
		</div>
	);
}