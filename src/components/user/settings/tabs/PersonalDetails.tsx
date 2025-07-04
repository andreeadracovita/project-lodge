import { SettingsSectionEnum } from "../SettingsSectionEnum";
import AvatarForm from "../sections/AvatarForm";
import EmailForm from "../sections/EmailForm";
import NameForm from "../sections/NameForm";
import NationalityForm from "../sections/NationalityForm";
import { getUserConfig } from "/src/api/BackendApiService";

export default function PersonalDetails({ data, showSectionHandler, clearSectionHandler, activeSection }) {

	return (
		<>
			<div className="row">
				<div className="col-10">
					<h1 className="page-heading">Personal details</h1>
					<p>Update your contact information and find out how it's used.</p>
				</div>
				<div className="col-2 justify-content-end">
					<AvatarForm
						isFocused={activeSection === SettingsSectionEnum.Avatar}
						showSectionHandler={showSectionHandler}
						clearSectionHandler={clearSectionHandler}
					/>
				</div>
			</div>
			<hr />
			<NameForm
				firstNameValue={data.firstName}
				lastNameValue={data.lastName}
				isFocused={activeSection === SettingsSectionEnum.Name}
				showSectionHandler={showSectionHandler}
				clearSectionHandler={clearSectionHandler}
			/>
			<hr />
			<EmailForm
				value={data.email}
				isFocused={activeSection === SettingsSectionEnum.Email}
				showSectionHandler={showSectionHandler}
				clearSectionHandler={clearSectionHandler}
			/>
			<hr />
			<NationalityForm
				value={data.nationality}
				isFocused={activeSection === SettingsSectionEnum.Nationality}
				showSectionHandler={showSectionHandler}
				clearSectionHandler={clearSectionHandler}
			/>
			<hr />
		</>
	);
}