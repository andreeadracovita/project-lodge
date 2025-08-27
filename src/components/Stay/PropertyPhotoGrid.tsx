import { useState } from "react";

import "./PropertyPhotoGrid.css";
import PhotoModal from "./PhotoModal";

type PropertyPhotoGridProps = {
	urlArray: string[]
};

export default function PropertyPhotoGrid({ urlArray }: PropertyPhotoGridProps) {
	const [targetPhoto, setTargetPhoto] = useState<number | undefined>();

	return (
		<div>
			<div className="d-none d-md-block">
				<div id="property-photo-grid" className="row g-2" data-bs-toggle="modal" data-bs-target="#photos-modal">
					<div className="col-6">
						<img
							src={urlArray.length > 0 ? urlArray[0] : undefined}
							className="main-img cursor-pointer"
							onClick={() => urlArray.length > 0 ? setTargetPhoto(0) : setTargetPhoto(undefined)}
						/>
					</div>
					<div className="col-6 g-2">
						<div className="row g-1">
							<div className="col">
								<img
									src={urlArray.length > 1 ? urlArray[1] : undefined}
									className="cursor-pointer"
									onClick={() => urlArray.length > 1 ? setTargetPhoto(1) : setTargetPhoto(undefined)}
								/>
							</div>
							<div className="col">
								<img
									src={urlArray.length > 2 ? urlArray[2] : undefined}
									className="top-right-radius cursor-pointer"
									onClick={() => urlArray.length > 2 ? setTargetPhoto(2) : setTargetPhoto(undefined)}
								/>
							</div>
							<div className="w-100"></div>
							<div className="col">
								<img
									src={urlArray.length > 3 ? urlArray[3] : undefined}
									className="cursor-pointer"
									onClick={() => urlArray.length > 3 ? setTargetPhoto(3) : setTargetPhoto(undefined)}
								/>
							</div>
							<div className="col">
								<img
									src={urlArray.length > 4 ? urlArray[4] : undefined}
									className="bottom-right-radius cursor-pointer"
									onClick={() => urlArray.length > 4 ? setTargetPhoto(4) : setTargetPhoto(undefined)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="d-block d-md-none">
				<div id="property-photo-grid" className="row g-1" data-bs-toggle="modal" data-bs-target="#photos-modal">
					<div className="col-12">
						<img
							src={urlArray.length > 0 ? urlArray[0] : undefined}
							className="main-img-mobile cursor-pointer"
							onClick={() => urlArray.length > 0 ? setTargetPhoto(0) : setTargetPhoto(undefined)}
						/>
					</div>
					<div className="col-12">
						<div className="row g-1">
							<div className="col">
								<img
									src={urlArray.length > 1 ? urlArray[1] : undefined}
									className="secondary-img-mobile bottom-left-radius cursor-pointer"
									onClick={() => urlArray.length > 1 ? setTargetPhoto(1) : setTargetPhoto(undefined)}
								/>
							</div>
							<div className="col">
								<img
									src={urlArray.length > 2 ? urlArray[2] : undefined}
									className="secondary-img-mobile cursor-pointer"
									onClick={() => urlArray.length > 2 ? setTargetPhoto(2) : setTargetPhoto(undefined)}
								/>
							</div>
							<div className="col">
								<img
									src={urlArray.length > 3 ? urlArray[3] : undefined}
									className="secondary-img-mobile cursor-pointer"
									onClick={() => urlArray.length > 3 ? setTargetPhoto(3) : setTargetPhoto(undefined)}
								/>
							</div>
							<div className="col">
								<img
									src={urlArray.length > 4 ? urlArray[4] : undefined}
									className="secondary-img-mobile bottom-right-radius cursor-pointer"
									onClick={() => urlArray.length > 4 ? setTargetPhoto(4) : setTargetPhoto(undefined)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<PhotoModal id="photo-modal" urlArray={urlArray} initial={targetPhoto} />
		</div>
	)
}
