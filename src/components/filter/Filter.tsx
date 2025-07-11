import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import "./Filter.css";
import { getAllExperiences, getAllFeatures, getAllPropertyTypes, getAllRentalTypes } from "/src/api/BackendApiService";
import { useAuth } from "/src/components/security/AuthContext";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";

export default function Filter({ city, lowestPrice, highestPrice }) {
	const authContext = useAuth();
	const [rangeValue, setRangeValue] = useState([lowestPrice, highestPrice]);
	const [features, setFeatures] = useState([]);
	const [experiences, setExperiences] = useState([]);
	const [propertyTypes, setPropertyTypes] = useState([]);
	const [rentalTypes, setRentalTypes] = useState([]);
	const [filter, setFilter] = useState({
		beds: 1,
		bedrooms: 1,
		bathrooms: 1
	});

	useEffect(() => {
		setRangeValue([lowestPrice, highestPrice]);
	}, [lowestPrice, highestPrice]);

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
				if (response.data.length > 0) {
					setExperiences(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
		getAllPropertyTypes()
			.then(response => {
				if (response.data.length > 0) {
					setPropertyTypes(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
		getAllRentalTypes()
			.then(response => {
				if (response.data.length > 0) {
					setRentalTypes(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function updateRange(event) {
		console.log("Update range");
		console.log(event);
	}
	
	return (
		<div className="border-section">
			<h2 className="section-heading">Filter by</h2>
			<div>
				<hr />
				<div className="text-strong">Your budget (per night)</div>
				<div className="mt-10">{lowestPrice} {authContext.currency} — {highestPrice} {authContext.currency}</div>
				<div className="mt-10">
					<RangeSlider
						id="range-slider"
						min={lowestPrice}
						max={highestPrice}
						step={10}
						value={rangeValue}
						onThumbDragEnd={setRangeValue}
					/>
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Property type</div>
				<div className="mt-10">
				{
					propertyTypes.map((ptype, i) => 
						<div key={i} className="form-check">
							<input className="form-check-input" type="checkbox" value={ptype.id} id={ptype.name} />
							<label className="form-check-label" htmlFor={ptype.name}>{capitalizeFirstLetter(ptype.name)}</label>
						</div>
					)
				}
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Rental type</div>
				<div className="mt-10">
				{
					rentalTypes.map((rtype, i) => 
						<div key={i} className="form-check">
							<input className="form-check-input" type="checkbox" value={rtype.id} id={rtype.name} />
							<label className="form-check-label" htmlFor={rtype.name}>{capitalizeFirstLetter(rtype.name)}</label>
						</div>
					)
				}
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Experiences in the area</div>
				<div className="mt-10">
				{
					experiences.map((exp, i) => 
						<div key={i} className="form-check">
							<input className="form-check-input" type="checkbox" value={exp.id} id={exp.name} />
							<label className="form-check-label" htmlFor={exp.name}>{capitalizeFirstLetter(exp.name)}</label>
						</div>
					)
				}
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Bed & Rooms</div>
				<div className="mt-10">
					<div className="row mt-6">
						<div className="col-6">
							<label htmlFor="beds">Beds</label>
						</div>
						<div className="col-6">
							<input
								id="beds"
								type="number"
								className="form-control"
								name="beds"
								value={filter.beds}
								onChange={undefined}
								required
							/>
						</div>
					</div>

					<div className="row mt-6">
						<div className="col-6">
							<label htmlFor="bedrooms">Bedrooms</label>
						</div>
						<div className="col-6">
							<input
								id="bedrooms"
								type="number"
								className="form-control"
								name="bedrooms"
								value={filter.bedrooms}
								onChange={undefined}
								required
							/>
						</div>
					</div>

					<div className="row mt-6">
						<div className="col-6">
							<label htmlFor="bathrooms">Bathrooms</label>
						</div>
						<div className="col-6">
							<input
								id="guests"
								type="number"
								className="form-control"
								name="bathrooms"
								value={filter.bathrooms}
								onChange={undefined}
								required
							/>
						</div>
					</div>
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Facilities</div>
				<div className="mt-10">
				{
					features.map((feat, i) => 
						<div key={i} className="form-check">
							<input className="form-check-input" type="checkbox" value={feat.id} id={feat.name} />
							<label className="form-check-label" htmlFor={feat.name}>{capitalizeFirstLetter(feat.name)}</label>
						</div>
					)
				}
				</div>
			</div>
			{
				city &&
				<div>
					<hr />
					<div className="text-strong">Distance from center of {city}</div>
					<div className="mt-10">
					<div className="form-check">
						<input className="form-check-input" type="radio" name="centerDistance" id="center-distance-1" value="1" />
						<label className="form-check-label" htmlFor="center-distance-1">Less than 1km</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="radio" name="centerDistance" id="center-distance-3" value="3" checked />
						<label className="form-check-label" htmlFor="center-distance-3">Less than 3km</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="radio" name="centerDistance" id="center-distance-5" value="5" />
						<label className="form-check-label" htmlFor="center-distance-5">Less than 5km</label>
					</div>
				</div>
				</div>
			}
		</div>
	);
}