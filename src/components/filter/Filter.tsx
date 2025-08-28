import { useState } from "react";
import { Eraser } from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

import "./Filter.css";
import FilterBudget from "./FilterBudget";
import FilterPropertyType from "./FilterPropertyType";
import FilterRentalType from "./FilterRentalType";
import FilterBedsRooms from "./FilterBedsRooms";
import FilterFeature from "./FilterFeature";
import FilterExperience from "./FilterExperience";
import FilterDistance from "./FilterDistance";

type FilterProps = {
	city?: string,
	lowestPrice?: number,
	highestPrice?: number
};

export default function Filter({ city, lowestPrice, highestPrice }: FilterProps) {
	const [searchParams, setSearchParams] = useSearchParams();

	const [filter, setFilter] = useState<any>({
		beds: searchParams.get("beds") ?? 1,
		bedrooms: searchParams.get("bedrooms") ?? 1,
		bathrooms: searchParams.get("bathrooms") ?? 1,
		rtype: searchParams.get("rtype")?.split(",").map(Number) ?? [],
		ptype: searchParams.get("ptype")?.split(",").map(Number) ?? [],
		exp: searchParams.get("exp")?.split(",").map(Number) ?? [],
		feat: searchParams.get("feat")?.split(",").map(Number) ?? [],
		dist: searchParams.get("dist")
	});

	function handleInputChange(event: any) {
		const { name, value } = event.target;
		setFilter((prevValue: any) => {
			return {
				...prevValue,
				[name]: value
			};
		});
		searchParams.set(name, value);
		setSearchParams(searchParams);
	}

	function updateMultiselectParams(event: any) {
		const { name, value } = event.target;
		const item = parseInt(value);

		let newValues = filter[name];
		if (newValues.includes(item)) {
			newValues = newValues.filter((val: number) => val !== item);
		} else {
			newValues.push(item);
		}
		setFilter((prevValue: any) => {
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
		searchParams.delete("dist");
		setSearchParams(searchParams);

		setFilter({
			beds: 1,
			bedrooms: 1,
			bathrooms: 1,
			rtype: [],
			ptype: [],
			exp: [],
			feat: [],
			dist: null
		});
	}
	
	return (
		<div className="border-section">
			<h2 className="section-heading">Filter by</h2>
			<hr />
			<FilterBudget lowestPrice={lowestPrice} highestPrice={highestPrice} />
			<hr />
			<FilterPropertyType filterData={filter} updateMultiselectParams={updateMultiselectParams} />
			<hr />
			<FilterRentalType filterData={filter} updateMultiselectParams={updateMultiselectParams} />
			<hr />
			<FilterBedsRooms filterData={filter} handleInputChange={handleInputChange} />
			<hr />
			<FilterFeature filterData={filter} updateMultiselectParams={updateMultiselectParams} />
			<hr />
			<FilterExperience filterData={filter} updateMultiselectParams={updateMultiselectParams} />
			{
				city &&
				<>
					<hr />
					<FilterDistance filterData={filter} city={city} handleInputChange={handleInputChange} />
				</>
			}
			<hr />
			<div id="clear-filters">
				<div className="mt-10 d-flex align-items-center cursor-pointer" onClick={clearFilters}>
					<Eraser size={20} />
					<span className="ms-1">Clear filters</span>
				</div>
			</div>
		</div>
	);
}