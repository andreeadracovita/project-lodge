import { useEffect, useState } from "react";

import { getAllPropertyTypes } from "api/BackendApiService";
import { capitalizeFirstLetter } from "utils/stringUtils";

type FilterPropertyTypeProps = {
	filterData: any,
	updateMultiselectParams: any
};

export default function FilterPropertyType({ filterData, updateMultiselectParams }: FilterPropertyTypeProps) {
	const [propertyTypes, setPropertyTypes] = useState([]);

	useEffect(() => {
		getAllPropertyTypes()
			.then(response => {
				setPropertyTypes(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	
	return (
		<div id="property">
			<div className="text-bold">Property type</div>
			<div className="mt-10">
			{
				propertyTypes.map((ptype: any, i: number) => 
					<div key={i} className="form-check">
						<input
							id={"ptype-" + ptype.name}
							className="form-check-input"
							type="checkbox"
							name="ptype"
							value={ptype.id}
							onChange={updateMultiselectParams}
							checked={filterData.ptype?.includes(ptype.id) ?? false}
						/>
						<label className="form-check-label" htmlFor={"ptype-" + ptype.name}>
							{capitalizeFirstLetter(ptype.name)}
						</label>
					</div>
				)
			}
			</div>
		</div>
	);
}