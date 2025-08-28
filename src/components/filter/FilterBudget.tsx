import { useEffect, useState } from "react";
import Slider from "rc-slider";
import { useSearchParams } from "react-router";

import "rc-slider/assets/index.css";
import { useAuth } from "components/security/AuthContext";

type FilterBudgetProps = {
	lowestPrice?: number,
	highestPrice?: number
};

export default function FilterBudget({ lowestPrice, highestPrice }: FilterBudgetProps) {
	const authContext: any = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const [rangeValue, setRangeValue] = useState<any>([parseInt(searchParams.get("plow") || "0"), parseInt(searchParams.get("phigh") || "0")]);
	
	useEffect(() => {
		if (!searchParams.get("plow") && lowestPrice && highestPrice) {
			setRangeValue([lowestPrice, highestPrice]);
		}
	}, [lowestPrice, highestPrice]);

	// Reset when clearing filters
	useEffect(() => {
		if (!searchParams.get("plow") && !searchParams.get("phigh") && lowestPrice && highestPrice) {
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
			<div className="text-bold">Your budget (per night)</div>
			<div className="mt-10">{rangeValue[0]} {authContext.currency} — {rangeValue[1]} {authContext.currency}</div>
			<div className="mt-10">
				<Slider
					range
					min={lowestPrice}
					max={highestPrice}
					value={rangeValue}
					onChange={setRangeValue}
					onChangeComplete={updateRangeParams}
				/>
			</div>
		</div>
	);
}