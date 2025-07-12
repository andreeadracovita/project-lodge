export default function FilterDistance() {
	
	return (
		<div id="distance">
			<div className="text-strong">Distance from center of {city}</div>
			<div className="mt-10">
				<div className="form-check">
					<input
						id="center-distance-1"
						className="form-check-input"
						type="radio"
						name="dist"
						value="1"
						onChange={() => {}}
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
						onChange={() => {}}
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
						onChange={() => {}}
					/>
					<label className="form-check-label" htmlFor="center-distance-5">Less than 5km</label>
				</div>
			</div>
		</div>
	);
}