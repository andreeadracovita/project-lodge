import { useState } from "react";
import { useSearchParams } from "react-router";

import { authorizeBookingAccess } from "api/BackendApiService";

export default function BookingUnauthGate({ setShowGate }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [input, setInput] = useState({
		confirmationNo: searchParams.get("id"),
		pinCode: searchParams.get("pin")
	});

	function handleChange(event) {
		const { value, name } = event.target;

		setInput((prevValue) => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		authorizeBookingAccess({
			confirmation_number: input.confirmationNo,
			pin_code: input.pinCode
		})
			.then(response => {
				if(response.data?.authorized === true) {
					setShowGate(false);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	
	return (
		<div className="d-flex justify-content-center">
			<div className="sign-in-container">
				<h1 className="page-heading">This page is protected for your security</h1>
				<p>Please enter your PIN code. The number can be found in your confirmation email.</p>
				<form onSubmit={handleFormSubmit}>
					<label htmlFor="confirmation-number">Confirmation number</label>
					<input
						id="confirmation-number"
						className="form-control rounded-pill"
						name="confirmationNo"
						value={input.confirmationNo}
						onChange={handleChange}
					></input>
					<label htmlFor="pin-code">PIN code</label>
					<input
						id="pin-code"
						className="form-control rounded-pill"
						name="pinCode"
						value={input.pinCode}
						onChange={handleChange}
					></input>
					<button type="submit" className="btn-pill mt-3 w-100">Go</button>
				</form>
			</div>
		</div>
	);
}