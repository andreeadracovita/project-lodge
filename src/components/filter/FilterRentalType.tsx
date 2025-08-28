import { useEffect, useState } from "react";

import { getAllRentalTypes } from "api/BackendApiService";
import { capitalizeFirstLetter } from "utils/stringUtils";

type FilterRentalTypeProps = {
	filterData: any,
	updateMultiselectParams: any
};

export default function FilterRentalType({ filterData, updateMultiselectParams }: FilterRentalTypeProps) {
	const [rentalTypes, setRentalTypes] = useState([]);

	useEffect(() => {
		getAllRentalTypes()
			.then(response => {
				setRentalTypes(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	
	return (
		<div id="rental">
			<div className="text-bold">Rental type</div>
			<div className="mt-10">
			{
				rentalTypes.map((rtype: any, i: number) => 
					<div key={i} className="form-check">
						<input
							id={"rtype-" + rtype.name}
							className="form-check-input"
							type="checkbox"
							name="rtype"
							value={rtype.id}
							onChange={updateMultiselectParams}
							checked={filterData.rtype?.includes(rtype.id) ?? false}
						/>
						<label className="form-check-label" htmlFor={"rtype-" + rtype.name}>
							{capitalizeFirstLetter(rtype.name)}
						</label>
					</div>
				)
			}
			</div>
		</div>
	);
}