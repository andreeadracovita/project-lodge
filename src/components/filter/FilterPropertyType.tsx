import { useEffect, useState } from "react";

import { getAllPropertyTypes } from "/src/api/BackendApiService";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";

export default function FilterPropertyType({ filterData, updateMultiselectParams }) {
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