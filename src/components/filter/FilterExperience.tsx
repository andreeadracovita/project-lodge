import { useEffect, useState } from "react";

import { getAllExperiences } from "/src/api/BackendApiService";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";

export default function FilterExperience({ filterData, updateMultiselectParams }) {
	const [experiences, setExperiences] = useState([]);

	useEffect(() => {
		getAllExperiences()
			.then(response => {
				setExperiences(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	
	return (
		<div id="experiences">
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
							checked={filterData.exp?.includes(exp.id) ?? false}
						/>
						<label className="form-check-label" htmlFor={"exp-" + exp.name}>
							{capitalizeFirstLetter(exp.name)}
						</label>
					</div>
				)
			}
			</div>
		</div>
	);
}