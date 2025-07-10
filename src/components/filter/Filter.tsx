import { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import { useAuth } from "/src/components/security/AuthContext";

export default function Filter({ city, lowestPrice, highestPrice }) {
	const authContext = useAuth();
	const [rangeValue, setRangeValue] = useState([lowestPrice, highestPrice]);
	useEffect(() => {
		setRangeValue([lowestPrice, highestPrice]);
	}, [lowestPrice, highestPrice]);

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
				<div className="text-strong">Review score</div>
				<div className="mt-10">
					Radio input
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Rental type</div>
				<div className="mt-10">
					multiple choice
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Property type</div>
				<div className="mt-10">
					multiple choice
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Experiences in the area</div>
				<div className="mt-10">
					multiple choice
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Bed & Bedrooms</div>
				<div className="mt-10">
					number input for each (at least given number)
				</div>
			</div>
			<div>
				<hr />
				<div className="text-strong">Facilities</div>
				<div className="mt-10">
					multiple choice
				</div>
			</div>
			{
				city &&
				<div>
					<hr />
					<div className="text-strong">Distance from center of {city}</div>
					<div>
						Radio input with given values
					</div>
				</div>
			}
		</div>
	);
}