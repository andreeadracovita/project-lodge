type FilterBedsRoomsProps = {
	filterData: any,
	handleInputChange: any
};

export default function FilterBedsRooms({ filterData, handleInputChange }: FilterBedsRoomsProps) {
	
	return (
		<div id="beds-rooms">
			<div className="text-bold">Bed & Rooms</div>
			<div className="mt-10">
				<div className="row mt-6">
					<div className="col-6">
						<label htmlFor="beds">Beds</label>
					</div>
					<div className="col-6">
						<input
							id="beds"
							type="number"
							className="form-control"
							min="1"
							name="beds"
							value={filterData.beds}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row mt-6">
					<div className="col-6">
						<label htmlFor="bedrooms">Bedrooms</label>
					</div>
					<div className="col-6">
						<input
							id="bedrooms"
							type="number"
							className="form-control"
							min="1"
							name="bedrooms"
							value={filterData.bedrooms}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row mt-6">
					<div className="col-6">
						<label htmlFor="bathrooms">Bathrooms</label>
					</div>
					<div className="col-6">
						<input
							id="bathrooms"
							type="number"
							className="form-control"
							min="1"
							name="bathrooms"
							value={filterData.bathrooms}
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}