import { SettingsSectionEnum } from "../SettingsSectionEnum";
import PasswordForm from "../sections/PasswordForm";

export default function LoginSecurity({ data, showSectionHandler, clearSectionHandler, activeSection }) {
	return (
		<>
			<h1 className="page-heading">Login and security</h1>
			<p>Update your security information.</p>
			<hr />
			<PasswordForm
				isFocused={activeSection === SettingsSectionEnum.Password}
				showSectionHandler={showSectionHandler}
				clearSectionHandler={clearSectionHandler}
			/>
			<hr />
		</>
	);
}