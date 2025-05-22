import "./PropertyPhotoGrid.css";

function PropertyPhotoGrid({urlArray}) {
	return (
		<div id="property-photo-grid" className="row g-2">
			<div className="col-6">
				<img src={urlArray.length > 0 ? urlArray[0] : null} className="main-img" />
			</div>
			<div className="col-6 g-2">
				<div className="row g-1">
					<div className="col">
						<img src={urlArray.length > 1 ? urlArray[1] : null} />
					</div>
					<div className="col">
						<img src={urlArray.length > 2 ? urlArray[2] : null} className="top-right-radius" />
					</div>
					<div className="w-100"></div>
					<div className="col">
						<img src={urlArray.length > 3 ? urlArray[3] : null} />
						
					</div>
					<div className="col">
						<img src={urlArray.length > 4 ? urlArray[4] : null} className="bottom-right-radius" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PropertyPhotoGrid;