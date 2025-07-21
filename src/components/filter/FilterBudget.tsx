import { useEffect, useState } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSearchParams } from "react-router";

import { useAuth } from "/src/components/security/AuthContext";

export default function FilterBudget({ lowestPrice, highestPrice }) {
	console.log("Lowest price:", lowestPrice);
	console.log("Highest price:", highestPrice);

	const authContext = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();

	console.log("plow", parseInt(searchParams.get("plow")));
	console.log("phigh", parseInt(searchParams.get("phigh")));

	const [rangeValue, setRangeValue] = useState([parseInt(searchParams.get("plow")), parseInt(searchParams.get("phigh"))]);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(100);

	console.log("min", min);
	console.log("max", max);
	
	useEffect(() => {
		if (!searchParams.get("plow")) {
			setRangeValue([lowestPrice, highestPrice]);
		}
		setMin(lowestPrice);
		setMax(highestPrice);
		console.log("set min, max");
	}, [lowestPrice, highestPrice]);

	// Reset when clearing filters
	useEffect(() => {
		if (!searchParams.get("plow") && !searchParams.get("phigh")) {
			setRangeValue([lowestPrice, highestPrice]);
		}
	}, [searchParams.get("plow"), searchParams.get("phigh")]);

	function updateRangeParams() {
		searchParams.set("plow", rangeValue[0]);
		searchParams.set("phigh", rangeValue[1]);
		setSearchParams(searchParams);
	}

	return (
		<div id="budget">
			<div className="text-strong">Your budget (per night)</div>
			<div className="mt-10">{rangeValue[0]} {authContext.currency} — {rangeValue[1]} {authContext.currency}</div>
			<div className="mt-10">
				<Slider
					range
					min={min}
					max={max}
					value={rangeValue}
					onChange={setRangeValue}
					onChangeComplete={updateRangeParams}
				/>
			</div>
		</div>
	);
}