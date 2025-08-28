import { useEffect, useState } from "react";

import { getAllFeatures } from "api/BackendApiService";
import { capitalizeFirstLetter } from "utils/stringUtils";

type FilterFeatureProps = {
	filterData: any,
	updateMultiselectParams: any
};

export default function FilterFeature({ filterData, updateMultiselectParams }: FilterFeatureProps) {
	const [features, setFeatures] = useState([]);

	useEffect(() => {
		getAllFeatures()
			.then(response => {
				setFeatures(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	
	return (
		<div id="features">
			<div className="text-bold">Features</div>
			<div className="mt-10">
			{
				features.map((feat: any, i: number) => 
					<div key={i} className="form-check">
						<input
							id={"feat-" + feat.name}
							className="form-check-input"
							type="checkbox"
							name="feat"
							value={feat.id}
							onChange={updateMultiselectParams}
							checked={filterData.feat?.includes(feat.id) ?? false}
						/>
						<label className="form-check-label" htmlFor={"feat-" + feat.name}>
							{capitalizeFirstLetter(feat.name)}
						</label>
					</div>
				)
			}
			</div>
		</div>
	);
}