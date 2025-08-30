import BookingCard from "./BookingCard";

type BookingSectionMobileProps = {
	price: number,
	maxGuests: number
};

export default function BookingSectionMobile({ price, maxGuests }: BookingSectionMobileProps) {
	
	return (
		<>
			<div id="mobile-book-container" className="d-block d-md-none sticky-bottom d-flex justify-content-center">
				<button type="button" className="btn-pill w-75 m-2" data-bs-toggle="modal" data-bs-target="#bookingCardModal">
					Book
				</button>
			</div>
			<div
				id="bookingCardModal"
				className="modal fade"
				tabIndex={-1}
				aria-labelledby="bookingCardModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<BookingCard price={price} maxGuests={maxGuests} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}