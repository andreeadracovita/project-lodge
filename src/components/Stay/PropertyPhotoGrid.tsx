import { useState } from "react";

import "./PropertyPhotoGrid.css";
import PhotoModal from "./PhotoModal";

export default function PropertyPhotoGrid({ urlArray }) {
	const [targetPhoto, setTargetPhoto] = useState(0);

	return (
		<div>
			<div id="property-photo-grid" className="row g-2 " data-bs-toggle="modal" data-bs-target="#photos-modal">
				<div className="col-6">
					<img
						src={urlArray.length > 0 ? urlArray[0] : null}
						className="main-img"
						onClick={() => urlArray.length > 0 ? setTargetPhoto(0) : setTargetPhoto(null)}
					/>
				</div>
				<div className="col-6 g-2">
					<div className="row g-1">
						<div className="col">
							<img
								src={urlArray.length > 1 ? urlArray[1] : null}
								onClick={() => urlArray.length > 1 ? setTargetPhoto(1) : setTargetPhoto(null)}
							/>
						</div>
						<div className="col">
							<img
								src={urlArray.length > 2 ? urlArray[2] : null}
								className="top-right-radius"
								onClick={() => urlArray.length > 2 ? setTargetPhoto(2) : setTargetPhoto(null)}
							/>
						</div>
						<div className="w-100"></div>
						<div className="col">
							<img
								src={urlArray.length > 3 ? urlArray[3] : null}
								onClick={() => urlArray.length > 3 ? setTargetPhoto(3) : setTargetPhoto(null)}
							/>
						</div>
						<div className="col">
							<img
								src={urlArray.length > 4 ? urlArray[4] : null}
								className="bottom-right-radius"
								onClick={() => urlArray.length > 4 ? setTargetPhoto(4) : setTargetPhoto(null)}
							/>
						</div>
					</div>
				</div>
			</div>

			<PhotoModal id="photo-modal" urlArray={urlArray} initial={targetPhoto} />
		</div>
	)
}
