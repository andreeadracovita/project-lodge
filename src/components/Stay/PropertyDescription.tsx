import { useEffect, useState } from "react";

import AvailabilitySection from "./AvailabilitySection";
import { getAllFeatures, getAllExperiences } from "api/BackendApiService";
import Feature from "components/common/Feature";
import MapView from "components/map/MapView";
import { capitalizeFirstLetter } from "utils/stringUtils";

type PropertyDescriptionProps = {
	property: any
};

export default function PropertyDescription({ property }: PropertyDescriptionProps) {
	const [features, setFeatures] = useState([]);
	const [experiences, setExperiences] = useState([]);

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
		getAllExperiences()
			.then(response => {
				if (response.data) {
					setExperiences(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	const guestsString = property.guests + " " + (property.guests > 1 ? "guests" : "guest");
	const bedsString = property.beds + " " + (property.beds > 1 ? "beds" : "bed");
	const bedroomsString = property.bedrooms + " " + (property.bedrooms > 1 ? "bedrooms" : "bedroom");
	const bathroomsString = property.bathrooms + " " + (property.bathrooms > 1 ? "bathrooms" : "bathroom");

	return (
		<>
			<h2 className="section-heading">About this property</h2>
			<div className="mt-10">
				{property.description.replace('\n', <br />)}
			</div>
			<div className="mt-6">Max {guestsString}</div>
			<div className="mt-6">{bedsString}, {bedroomsString}, {bathroomsString}</div>
			{/*<div className="btn-pill-outline mt-6">Show more</div>
			<div className="btn-pill-outline mt-6">Show less</div>*/}
			<hr />
			<h2 className="section-heading">Features</h2>
			<div className="mt-10">
				{
					property.features_ids.map((id: number, i: number) => {
						const foundFeature: any = features.find((feat: any) => feat.id == id);
						if (foundFeature) {
							return <span key={i} className="mt-10"><Feature name={foundFeature.name} /></span>
						}
					})
				}
			</div>
			{/*<div className="btn-pill-outline mt-6">Show more</div>
			<div className="btn-pill-outline mt-6">Show less</div>*/}
			{
				property.is_listed &&
				<>
					<hr />
					<AvailabilitySection />
				</>
			}
			<hr />
			<h2 className="section-heading">Experiences around</h2>
			<div className="mt-10">
				{
					property.experiences_ids.map((id: number, i: number) => {
						const foundExperience: any = experiences.find((exp: any) => exp.id == id);
						if (foundExperience) {
							return <span key={i} className="features-list-item">
								{capitalizeFirstLetter(foundExperience.name)}
							</span>
						}
					})
				}
			</div>
			<hr />
			<h2 className="section-heading">Area</h2>
			<div className="mt-10">
				<MapView
					id="map"
					height={350}
					center={[property.geo.x, property.geo.y]}
					zoom={14}
					points={[[property.geo.x, property.geo.y]]}
					boundingbox={undefined}
					isEditable={false}
					updatePinPosition={undefined}
					updateIdsMap={undefined}
					handleHighlightItem={undefined}
					shouldShowText={undefined}
					priceMap={undefined}
				/>
			</div>
		</>
	);
}
