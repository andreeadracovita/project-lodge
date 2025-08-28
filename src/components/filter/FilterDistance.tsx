type FilterDistanceProps = {
	filterData: any,
	city: string,
	handleInputChange: any
};

export default function FilterDistance({ filterData, city, handleInputChange }: FilterDistanceProps) {
	
	return (
		<div id="distance">
			<div className="text-bold">Distance from center of {city}</div>
			<div className="mt-10">
				<div className="form-check">
					<input
						id="center-distance-1"
						className="form-check-input"
						type="radio"
						name="dist"
						value="1"
						onChange={handleInputChange}
						checked={filterData.dist === "1"}
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
						onChange={handleInputChange}
						checked={filterData.dist === "3"}
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
						onChange={handleInputChange}
						checked={filterData.dist === "5"}
					/>
					<label className="form-check-label" htmlFor="center-distance-5">Less than 5km</label>
				</div>
			</div>
		</div>
	);
}