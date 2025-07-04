import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";
import { Link } from "react-router-dom";

import BookingForm from "/src/components/booking/BookingForm";
import BookingSelection from "/src/components/booking/BookingSelection";

export default function Book() {
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("id");
	const guests = searchParams.get("guests");
	const checkIn = searchParams.get("check_in");
	const checkOut = searchParams.get("check_out");
	const linkPath = `/stay?id=${id}&guests=${guests}&check_in=${checkIn}&check_out=${checkOut}`;
	
	return (
		<div className="container section-container">
			<Link to={ linkPath }>
				<div className="lato-bold d-flex align-items-center">
					<Icon.ChevronLeft size={24} /><span className="ms-2">Back</span>
				</div>
			</Link>
			<div className="section-container row">
				<div className="col-2 lato-bold d-flex align-items-center">
					<Icon.CheckCircle size={24} />
					<span className="ms-2">Your selection</span>
				</div>
				<div className="col-3"><hr /></div>
				<div className="col-2 lato-bold d-flex align-items-center justify-content-center">
					<Icon.Icon2Circle size={24} />
					<span className="ms-2">Your details</span>
				</div>
				<div className="col-3"><hr /></div>
				<div className="col-2 lato-bold d-flex align-items-center justify-content-end">
					<Icon.Icon3Circle size={24} />
					<span className="ms-2">Finish booking</span>
				</div>
			</div>
			<div className="row section-container">
				<div className="col-4">
					<BookingSelection />
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