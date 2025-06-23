import { useEffect, useState } from "react";
import classNames from "classnames";

import Avatar from "./Avatar";
import "./PersonalDetails.css";
import { updateUser, uploadAvatar } from "/src/api/BackendApiService";
import { useAuth } from "/src/components/security/AuthContext";

enum Section {
	None,
	Avatar,
	Name,
	Email,
	Nationality
}

export default function PersonalDetails() {
	const authContext = useAuth();
	const [avatarUrl, setAvatarUrl] = useState();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [nationality, setNationality] = useState("");

	const [visibleSection, setVisibleSection] = useState(Section.None);

	// Fetch info from db
	useEffect(() => {

	}, []);

	function handleChange(event): void {
		const { name, value } = event.target;
		setInput((prevVal) => {
			return {
				...prevVal,
				[name]: value
			}
		})
	}

	function handleNameSubmit(): void {
		
	}

	function handleEmailSubmit(): void {
		
	}

	function handleNationalitySubmit(): void {
		
	}

	function showSection(section: Section): void {
		setVisibleSection(section);
	}

	function clearSection(): void {
		setVisibleSection(Section.None);
	}

	function handleAvatarClick(): void {
		showSection(Section.Avatar);
		document.getElementById("avatar-input").click();
	}

	function handleAvatarUploaded(event): void {
		const files = Array.from(event.target.files);
		if (files.length > 0) {
			const tempUrl = URL.createObjectURL(files[0]);
			setAvatarUrl(tempUrl);
		}
	}

	async function handleAvatarSubmit(event): void {
		event.preventDefault();

		const files = event.target.avatar.files;
		if (files.length === 0) {
			clearSection();
			return;
		}

		const data = new FormData();
		data.append("avatar", files[0]);

		uploadAvatar(data)
			.then(response => {
				updateUser({ img_url: response.data.filename })
					.then(() => {
						clearSection();
						authContext.setUserConfig();
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch(error => {
				console.error(error);
			});
	}

	function handleAvatarDismissClick(): void {
		clearSection();
		setAvatarUrl(null);
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
				<div className="col-2 justify-content-end">
					<form onSubmit={handleAvatarSubmit}>
						<div className="d-flex flex-wrap justify-content-center">
							<div className="avatar-container d-flex justify-content-center align-items-center w-100">
								<div onClick={handleAvatarClick}>
									<Avatar size={52} previewAvatar={avatarUrl} />
									<input
										id="avatar-input"
										type="file"
										name="avatar"
										onChange={handleAvatarUploaded}
										accept="image/png, image/jpeg"
									/>
								</div>
							</div>
							{
								visibleSection === Section.Avatar &&
								<div className="d-flex">
									<button className="btn-text-underline" type="submit">Save</button>
									<button className="btn-text-underline" onClick={handleAvatarDismissClick}>Dismiss</button>
								</div>
							}
						</div>
					</form>
				</div>
			</div>
			
			<hr />
			<form onSubmit={handleNameSubmit}>
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
							? <span className="btn-text-underline" onClick={clearSection}>Save</span>
							: <span className="btn-text-underline" onClick={() => showSection(Section.Name)}>Edit</span>
						}
					</div>
				</div>
			</form>
			<hr />
			<form onSubmit={handleEmailSubmit}>
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
							? <span className="btn-text-underline" onClick={clearSection}>Save</span>
							: <span className="btn-text-underline" onClick={() => showSection(Section.Email)}>Edit</span>
						}
					</div>
				</div>
			</form>
			<hr />
			<form onSubmit={handleNationalitySubmit}>
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
							? <span className="btn-text-underline" onClick={clearSection}>Save</span>
							: <span className="btn-text-underline" onClick={() => showSection(Section.Nationality)}>Edit</span>
						}
					</div>
				</div>
			</form>
			<hr />
		</>
	);
}