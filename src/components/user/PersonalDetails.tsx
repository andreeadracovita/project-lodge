import { useEffect, useState } from "react";
import classNames from "classnames";

import Avatar from "./Avatar";
import "./PersonalDetails.css";

enum Section {
	None,
	Name,
	Email,
	Nationality
}

export default function PersonalDetails() {
	const [avatarUrl, setAvatarUrl] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [nationality, setNationality] = useState("");

	const [visibleSection, setVisibleSection] = useState(Section.None);

	// Fetch info from db
	useEffect(() => {

	});

	function handleChange(event): void {
		const { name, value } = event.target;
		setInput((prevVal) => {
			return {
				...prevVal,
				[name]: value
			}
		})
	}

	function handleSubmit(): void {
		console.log("Update info");
	}

	function showSection(section: Section): void {
		setVisibleSection(section);
	}

	function clearSection(): void {
		setVisibleSection(Section.None);
	}

	const formClassNames = classNames(
		"form-control",
		"rounded-pill",
		"w-100"
	);

	return (
		<>
			<div className="row">
				<div className="col-10">
					<h1 className="page-heading">Personal details</h1>
					<p>Update your contact information and find out how it's used.</p>
				</div>
				<div className="col-2 d-flex justify-content-end">
					<div className="avatar-container d-flex justify-content-center align-items-center">
						<Avatar size={52} />
					</div>
				</div>
			</div>
			
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="row px-3">
					<div className="col-2">
						<label htmlFor="first-name">Name</label>
					</div>
					<div className="col-8">
						{
							visibleSection === Section.Name
							? <>
								<label htmlFor="first-name">First name</label>
								<input id="first-name" name="firstName" value={firstName} onChange={handleChange} className={formClassNames} />

								<label htmlFor="last-name">Last name</label>
								<input id="last-name" name="lastName" value={lastName} onChange={handleChange} className={formClassNames} />
							</>
							: <>
								<span>First Last</span>
							</>
						}
						
					</div>
					<div className="col-2 text-end">
						{
							visibleSection === Section.Name
							? <span className="btn-text-underline" onClick={() => clearSection()}>Save</span>
							: <span className="btn-text-underline" onClick={() => showSection(Section.Name)}>Edit</span>
						}
					</div>
				</div>
			</form>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="row px-3">
					<div className="col-2">
						<label htmlFor="email">Email</label>
					</div>
					<div className="col-8">
						{
							visibleSection === Section.Email
							? <input id="email" name="email" value={email} onChange={handleChange} className={formClassNames} />
							: <span>Email@</span>
						}
					</div>
					<div className="col-2 text-end">
						{
							visibleSection === Section.Email
							? <span className="btn-text-underline" onClick={() => clearSection()}>Save</span>
							: <span className="btn-text-underline" onClick={() => showSection(Section.Email)}>Edit</span>
						}
					</div>
				</div>
			</form>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="row px-3">
					<div className="col-2">
						<label htmlFor="nationality">Nationality</label>
					</div>
					<div className="col-8">
						{
							visibleSection === Section.Nationality
							? <input id="nationality" name="nationality" value={nationality} onChange={handleChange} className={formClassNames} />
							: <span>[Nationality]</span>
						}
						
					</div>
					<div className="col-2 text-end">
						{
							visibleSection === Section.Nationality
							? <span className="btn-text-underline" onClick={() => clearSection()}>Save</span>
							: <span className="btn-text-underline" onClick={() => showSection(Section.Nationality)}>Edit</span>
						}
					</div>
				</div>
			</form>
			<hr />
		</>
	);
}