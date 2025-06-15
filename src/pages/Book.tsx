import { useSearchParams } from "react-router";

import BookingForm from "/src/components/booking/BookingForm";

export default function Book() {
	const [searchParams, setSearchParams] = useSearchParams();
	
	return (
		<div className="container section-container">
			<div className="row">
				<div className="col-2 lato-bold">Your selection</div>
				<div className="col-3"><hr /></div>
				<div className="col-2 lato-bold text-center">Your details</div>
				<div className="col-3"><hr /></div>
				<div className="col-2 lato-bold text-end">Finish booking</div>
			</div>
			<div className="row section-container">
				<div className="col-4">
					<div className="border-section">
						<p>[TODO] Prop & price details here</p>
						<p>{ searchParams.get("check_in") } - { searchParams.get("check_out") }</p>
						<p>{ searchParams.get("guests") } guests</p>
					</div>
				</div>
				<div className="col-8">
					<div className="border-section">
						<BookingForm />
					</div>
				</div>
			</div>
			
		</div>
	);
}