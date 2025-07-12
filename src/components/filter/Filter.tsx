import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useSearchParams } from "react-router";

import "./Filter.css";
import { getAllExperiences, getAllFeatures, getAllPropertyTypes, getAllRentalTypes } from "/src/api/BackendApiService";
import { useAuth } from "/src/components/security/AuthContext";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";

export default function Filter({ city, lowestPrice, highestPrice }) {
	const authContext = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();

	const [rangeValue, setRangeValue] = useState([parseInt(searchParams.get("plow")), parseInt(searchParams.get("phigh"))]);
	const [features, setFeatures] = useState([]);
	const [experiences, setExperiences] = useState([]);
	const [propertyTypes, setPropertyTypes] = useState([]);
	const [rentalTypes, setRentalTypes] = useState([]);

	const [filter, setFilter] = useState({
		beds: searchParams.get("beds") ?? 1,
		bedrooms: searchParams.get("bedrooms") ?? 1,
		bathrooms: searchParams.get("bathrooms") ?? 1,
		rtype: searchParams.get("rtype")?.split(",").map(Number) ?? [],
		ptype: searchParams.get("ptype")?.split(",").map(Number) ?? [],
		exp: searchParams.get("exp")?.split(",").map(Number) ?? [],
		feat: searchParams.get("feat")?.split(",").map(Number) ?? []
	});

	useEffect(() => {
		if (!searchParams.get("plow")) {
			setRangeValue([lowestPrice, highestPrice]);
		}
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

	function updateRangeParams() {
		searchParams.set("plow", rangeValue[0]);
		searchParams.set("phigh", rangeValue[1]);
		setSearchParams(searchParams);
	}

	function handleInputChange(event) {
		const { name, value } = event.target;
		setFilter(prevValue => {
			return {
				...prevValue,
				[name]: value
			};
		});
		searchParams.set(name, value);
		setSearchParams(searchParams);
	}

	function updateMultiselectParams(event) {
		const { name, value } = event.target;
		const item = parseInt(event.target.value);

		let newValues = filter[name];
		if (newValues.includes(item)) {
			newValues = newValues.filter(val => val !== item);
		} else {
			newValues.push(item);
		}
		setFilter(prevValue => {
			return {
				...prevValue,
				[name]: newValues
			};
		});
		if (newValues.length > 0) {
			searchParams.set(name, newValues.join(","));
			
		} else {
			searchParams.delete(name);
		}
		setSearchParams(searchParams);
	}

	function clearFilters() {
		searchParams.delete("beds");
		searchParams.delete("bedrooms");
		searchParams.delete("bathrooms");
		searchParams.delete("feat");
		searchParams.delete("exp");
		searchParams.delete("plow");
		searchParams.delete("phigh");
		searchParams.delete("ptype");
		searchParams.delete("rtype");
		setSearchParams(searchParams);

		setRangeValue([lowestPrice, highestPrice]);
		setFilter({
			beds: 1,
			bedrooms: 1,
			bathrooms: 1,
			rtype: [],
			ptype: [],
			exp: [],
			feat: []
		});
	}
	
	return (
		<div className="border-section">
			<h2 className="section-heading">Filter by</h2>
			<div id="budget">
				<hr />
				<div className="text-strong">Your budget (per night)</div>
				<div className="mt-10">{rangeValue[0]} {authContext.currency} — {rangeValue[1]} {authContext.currency}</div>
				<div className="mt-10">
					<RangeSlider
						id="range-slider"
						min={lowestPrice}
						max={highestPrice}
						step={1}
						value={rangeValue}
						onInput={setRangeValue}
						onThumbDragEnd={updateRangeParams}
					/>
				</div>
			</div>
			<div id="property">
				<hr />
				<div className="text-strong">Property type</div>
				<div className="mt-10">
				{
					propertyTypes.map((ptype, i) => 
						<div key={i} className="form-check">
							<input
								id={"ptype-" + ptype.name}
								className="form-check-input"
								type="checkbox"
								name="ptype"
								value={ptype.id}
								onChange={updateMultiselectParams}
								checked={filter.ptype?.includes(ptype.id) ?? false}
							/>
							<label className="form-check-label" htmlFor={"ptype-" + ptype.name}>
								{capitalizeFirstLetter(ptype.name)}
							</label>
						</div>
					)
				}
				</div>
			</div>
			<div id="rental">
				<hr />
				<div className="text-strong">Rental type</div>
				<div className="mt-10">
				{
					rentalTypes.map((rtype, i) => 
						<div key={i} className="form-check">
							<input
								id={"rtype-" + rtype.name}
								className="form-check-input"
								type="checkbox"
								name="rtype"
								value={rtype.id}
								onChange={updateMultiselectParams}
								checked={filter.rtype?.includes(rtype.id) ?? false}
							/>
							<label className="form-check-label" htmlFor={"rtype-" + rtype.name}>
								{capitalizeFirstLetter(rtype.name)}
							</label>
						</div>
					)
				}
				</div>
			</div>
			<div id="experiences">
				<hr />
				<div className="text-strong">Experiences in the area</div>
				<div className="mt-10">
				{
					experiences.map((exp, i) => 
						<div key={i} className="form-check">
							<input
								id={"exp-" + exp.name}
								className="form-check-input"
								type="checkbox"
								name="exp"
								value={exp.id}
								onChange={updateMultiselectParams}
								checked={filter.exp?.includes(exp.id) ?? false}
							/>
							<label className="form-check-label" htmlFor={"exp-" + exp.name}>
								{capitalizeFirstLetter(exp.name)}
							</label>
						</div>
					)
				}
				</div>
			</div>
			<div id="beds-rooms">
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
								min="1"
								name="beds"
								value={filter.beds}
								onChange={handleInputChange}
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
								min="1"
								name="bedrooms"
								value={filter.bedrooms}
								onChange={handleInputChange}
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
								min="1"
								name="bathrooms"
								value={filter.bathrooms}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
			</div>
			<div id="features">
				<hr />
				<div className="text-strong">Features</div>
				<div className="mt-10">
				{
					features.map((feat, i) => 
						<div key={i} className="form-check">
							<input
								id={"feat-" + feat.name}
								className="form-check-input"
								type="checkbox"
								name="feat"
								value={feat.id}
								onChange={updateMultiselectParams}
								checked={filter.feat?.includes(feat.id) ?? false}
							/>
							<label className="form-check-label" htmlFor={"feat-" + feat.name}>
								{capitalizeFirstLetter(feat.name)}
							</label>
						</div>
					)
				}
				</div>
			</div>
			{
				city &&
				<div id="distance">
					<hr />
					<div className="text-strong">Distance from center of {city}</div>
					<div className="mt-10">
						<div className="form-check">
							<input
								id="center-distance-1"
								className="form-check-input"
								type="radio"
								name="dist"
								value="1"
								onChange={() => {}}
							/>
							<label className="form-check-label" htmlFor="center-distance-1">Less than 1km</label>
						</div>
						<div className="form-check">
							<input
								id="center-distance-3"
								className="form-check-input"
								type="radio"
								name="dist"
								value="3"
								onChange={() => {}}
							/>
							<label className="form-check-label" htmlFor="center-distance-3">Less than 3km</label>
						</div>
						<div className="form-check">
							<input
								id="center-distance-5"
								className="form-check-input"
								type="radio"
								name="dist"
								value="5"
								onChange={() => {}}
							/>
							<label className="form-check-label" htmlFor="center-distance-5">Less than 5km</label>
						</div>
					</div>
				</div>
			}
			<div id="clear-filters">
				<hr />
				<div className="mt-10 d-flex align-items-center cursor-pointer" onClick={clearFilters}>
					<Icon.Eraser size={20} />
					<span className="ms-1">Clear filters</span>
				</div>
			</div>
		</div>
	);
}