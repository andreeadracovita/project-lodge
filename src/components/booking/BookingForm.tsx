import { useState } from "react";
import { CheckCircle } from "react-bootstrap-icons";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { createBooking } from "api/BackendApiService";
import CountrySelect from "components/common/CountrySelect";
import FormError from "components/common/FormError";

export default function BookingForm() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [input, setInput] = useState({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		city: "",
		countryCode: "",
		phoneNo: ""
	});
	const [errors, setErrors] = useState<string[]>([]);

	function handleChange(event: any) {
		const { name, value } = event.target;
		setInput((prevValue: any) => {
			return {
				...prevValue,
				[name]: value
			}
		});
	}

	function handleCountryChange(value: string) {
		setInput((prevValue: any) => {
			return {
				...prevValue,
				countryCode: value
			}
		});
	}

	function onSubmit(event: any) {
		event.preventDefault();

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
			country: input.countryCode,
			phone_number: input.phoneNo
		})
			.then(response => {
				const errors = response.data.errors;
				if (errors) {
					setErrors(errors);
					return;
				}
				if (response.data) {
					const bookingId = response.data.id;
					const pinCode = response.data.pin_code;
					navigate(`/booking?id=${bookingId}&pin=${pinCode}`);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}

	return (
		<>
			<h1 className="page-heading">Enter your details</h1>
			<div className="d-flex align-items-center" style={{color: "green"}}>
				<CheckCircle size={16} />
				<span className="ms-2">Almost done! Just fill in the <span className="text-red">*</span> required info</span>
			</div>
			<form onSubmit={onSubmit}>
				<label htmlFor="first-name">First name <span className="text-red">*</span></label>
				<input
					id="first-name"
					type="text"
					className="form-control"
					name="firstName"
					value={input.firstName}
					onChange={handleChange}
					maxLength={50}
					required
				/>

				<label htmlFor="last-name">Last name <span className="text-red">*</span></label>
				<input
					id="last-name"
					type="text"
					className="form-control"
					name="lastName"
					value={input.lastName}
					onChange={handleChange}
					maxLength={50}
					required
				/>

				<label htmlFor="email">Email <span className="text-red">*</span></label>
				<input
					id="email"
					type="text"
					className="form-control"
					name="email"
					value={input.email}
					onChange={handleChange}
					maxLength={50}
					required
				/>

				<hr />

				<h2 className="section-heading">Address</h2>
				<label htmlFor="address">Street and street number <span className="text-red">*</span></label>
				<input
					id="address"
					type="text"
					className="form-control"
					name="address"
					value={input.address}
					onChange={handleChange}
					maxLength={50}
					required
				/>

				<label htmlFor="city">City <span className="text-red">*</span></label>
				<input
					id="city"
					type="text"
					className="form-control"
					name="city"
					value={input.city}
					onChange={handleChange}
					maxLength={50}
					required
				/>

				<label htmlFor="nationality">Country <span className="text-red">*</span></label>
				<CountrySelect
					id="nationality"
					initialValue={input.countryCode}
					handleFormChange={handleCountryChange}
				/>

				<label htmlFor="phone-number">Phone number <span className="text-red">*</span></label>
				<input
					id="phone-number"
					type="text"
					className="form-control"
					name="phoneNo"
					value={input.phoneNo}
					onChange={handleChange}
					maxLength={50}
					required
				/>
				<FormError errors={errors} />
				
				<div className="d-flex justify-content-end">
					<button type="submit" className="mt-4 btn-pill">Finish booking</button>
				</div>
			</form>
		</>
	);
}