import { useState } from "react";
import { useSearchParams } from "react-router";

import { createBooking } from "/src/api/BackendApiService";

export default function Book() {
	const [searchParams, setSearchParams] = useSearchParams();
	// TODO: pre-fill if user is logged-in
	const [input, setInput] = useState({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		city: "",
		country: "",
		phoneNo: "",
		cardNo: "0000000000000000",
		cardHolder: "John Doe"
	});

	// useEffect to retrieve booking info related to property, price


	function onChange(event) {
		const { name, value } = event.target;
		setInput(prevValue => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	function onSubmit(event) {
		event.preventDefault();

		// TODO: Validate input
		const checkIn = searchParams.get("check_in");
		const checkOut = searchParams.get("check_out");
		const guests = searchParams.get("guests");
		const propertyId = searchParams.get("id");
		if (!checkIn || !checkOut || !guests || !propertyId) {
			return;
		}

		createBooking({
			property_id: propertyId,
			check_in: checkIn,
			check_out: checkOut,
			guests: guests,
			first_name: input.firstName,
			last_name: input.lastName,
			email: input.email,
			address: input.address,
			city: input.city,
			country: input.country,
			phone_number: input.phoneNo,
			card_number: input.cardNo,
			card_holder: input.cardHolder,
			price: 200 // ! TODO
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.error(error);
			})
	}
	
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
						<h1 className="page-heading">Enter your details</h1>
						<form onSubmit={onSubmit}>
							<label htmlFor="first-name">First name</label>
							<input id="first-name" type="text" className="form-control rounded-pill" name="firstName" value={ input.firstName } onChange={onChange} />

							<label htmlFor="last-name">Last name</label>
							<input id="last-name" type="text" className="form-control rounded-pill" name="lastName" value={ input.lastName } onChange={onChange} />

							<label htmlFor="email">Email</label>
							<input id="email" type="text" className="form-control rounded-pill" name="email" value={ input.email } onChange={onChange} />

							<hr />
							<h2 className="section-heading">Address</h2>
							<label htmlFor="address">Address</label>
							<input id="address" type="text" className="form-control rounded-pill" name="address" value={ input.address } onChange={onChange} />

							<label htmlFor="city">City</label>
							<input id="city" type="text" className="form-control rounded-pill" name="city" value={ input.city } onChange={onChange} />

							<label htmlFor="country">Country</label>
							<input id="country" type="text" className="form-control rounded-pill" name="country" value={ input.country } onChange={onChange} />

							<label htmlFor="phone-number">Phone number</label>
							<input id="phone-number" type="text" className="form-control rounded-pill" name="phoneNo" value={ input.phoneNo } onChange={onChange} />

							<hr />
							<h2 className="section-heading">Payment</h2>
							<label htmlFor="card-number">Card number</label>
							<input id="card-number" type="text" className="form-control rounded-pill" name="cardNo" value={ input.cardNo } onChange={onChange} readOnly />

							<label htmlFor="card-holder">Card holder</label>
							<input id="card-holder" type="text" className="form-control rounded-pill" name="cardHolder" value={ input.cardHolder } onChange={onChange} readOnly />

							<div className="d-flex justify-content-end">
								<button type="submit" className="mt-4 btn-pill">Finish booking</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			
		</div>
	);
}