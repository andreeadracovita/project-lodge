import { useEffect, useState } from "react";

import Avatar from "./Avatar";

export default function PersonalDetails() {
	const [input, setInput] = useState({
		firstName: "abc",
		lastName: "def",
		email: "abc@def.com",
		avatar: "00000001.jpg"
	});

	// Fetch info from db
	useEffect(() => {

	});

	function handleChange(event) {
		const { name, value } = event.target;
		setInput((prevVal) => {
			return {
				...prevVal,
				[name]: value
			}
		})
	}

	function handleSubmit() {
		console.log("Update info");
	}

	return (
		<>
			<h1 className="page-heading">Personal details</h1>
			<p>Update your contact information and find out how it's used</p>
			<hr />
			<form onSubmit={handleSubmit}>
				{/*<input id="first-name" name="firstName" value={input.firstName} onChange={handleChange} />*/}
				<Avatar size={46} />
				Edit
				<hr />
				<label htmlFor="first-name">First name</label>
				<input id="first-name" name="firstName" value={input.firstName} onChange={handleChange} />
				<hr />
				<label htmlFor="last-name">Last name</label>
				<input id="last-name" name="lastName" value={input.lastName} onChange={handleChange} />
				<hr />
				<label htmlFor="email">Email</label>
				<input id="email" name="email" value={input.email} onChange={handleChange} />
			</form>
		</>
	);
}