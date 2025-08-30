import classNames from "classnames";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import "./PhotoModal.css";

type PhotoModalProps = {
	id: string,
	urlArray: string[],
	initial: number | undefined
};

export default function PhotoModal({ id, urlArray, initial }: PhotoModalProps) {
	const [activeSlide, setActiveSlide] = useState<number | undefined>(initial);

	useEffect(() => {
		setActiveSlide(initial);
	}, [initial])

	function decrementActiveSlide() {
		if (!activeSlide) {
			return;
		}
		if (activeSlide - 1 < 0) {
			setActiveSlide(urlArray.length - 1);
		} else {
			setActiveSlide(activeSlide - 1);
		}
	}

	function incrementActiveSlide() {
		if (!activeSlide) {
			return;
		}
		if (activeSlide + 1 > urlArray.length - 1) {
			setActiveSlide(0);
		} else {
			setActiveSlide(activeSlide + 1);
		}
	}
	
	return (
		<div
			id={id}
			className="modal fade"
			tabIndex={-1}
			aria-labelledby="photosModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div id="photo-carousel" className="carousel slide" data-bs-pause="true">
							<div className="carousel-inner">
							{
								urlArray.map((url: string, i: number) => {
									const className = classNames(
										"carousel-item",
										{
											"active": i === activeSlide
										}
									);
									return (
										<div key={i} className={className}>
											<img src={url} className="d-block photo-carousel-item" alt="property photo" />
										</div>
									);
								})
							}
							</div>
							<button
								className="carousel-control-prev"
								type="button"
								onClick={decrementActiveSlide}
							>
								<span><ChevronLeft size={24} color={"#000"} /></span>
							</button>
							<button
								className="carousel-control-next"
								type="button"
								onClick={incrementActiveSlide}
							>
								<span><ChevronRight size={24} color={"#000"} /></span>
							</button>
						</div>
						<div id="thumbnails-container" className="mt-1 d-flex">
						{
							urlArray.map((url: string, i: number) => 
								<img
									key={i}
									src={url}
									className="thumbnail me-1"
									onClick={() => setActiveSlide(i)}
								/>
							)
						}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}