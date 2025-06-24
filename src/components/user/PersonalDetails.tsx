import { useEffect, useState } from "react";

import "./PersonalDetails.css";
import { SettingsSectionEnum } from "./settings/SettingsSectionEnum";
import AvatarForm from "./settings/avatar/AvatarForm";
import EmailForm from "./settings/email/EmailForm";
import NameForm from "./settings/name/NameForm";
import NationalityForm from "./settings/nationality/NationalityForm";
import { getUserConfig, updateUser, uploadAvatar } from "/src/api/BackendApiService";

export default function PersonalDetails() {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		nationality: ""
	});
	const [visibleSection, setVisibleSection] = useState(SettingsSectionEnum.None);

	// Fetch info from db
	useEffect(() => {
		// get user details, setData
		getUserConfig()
			.then(response => {
				console.log(response.data);
				setData(prevVal => {
					return {
						firstName: response.data.first_name,
						lastName: response.data.last_name,
						email: response.data.email,
						nationality: response.data.country_code
					}
				})
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	function showSection(section: SettingsSectionEnum): void {
		setVisibleSection(section);
	}

	function clearSection(): void {
		setVisibleSection(SettingsSectionEnum.None);
	}

	return <>
			<div className="row">
				<div className="col-10">
					<h1 className="page-heading">Personal details</h1>
					<p>Update your contact information and find out how it's used.</p>
				</div>
				<div className="col-2 justify-content-end">
					<AvatarForm
						isFocused={visibleSection === SettingsSectionEnum.Avatar}
						showSection={showSection}
						clearSection={clearSection}
					/>
				</div>
			</div>
			<hr />
			<NameForm
				firstNameValue={data.firstName}
				lastNameValue={data.lastName}
				isFocused={visibleSection === SettingsSectionEnum.Name}
				showSection={showSection}
				clearSection={clearSection}
			/>
			<hr />
			<EmailForm
				value={data.email}
				isFocused={visibleSection === SettingsSectionEnum.Email}
				showSection={showSection}
				clearSection={clearSection}
			/>
			<hr />
			<NationalityForm
				value={data.nationality}
				isFocused={visibleSection === SettingsSectionEnum.Nationality}
				showSection={showSection}
				clearSection={clearSection}
			/>
			<hr />
		</>
}