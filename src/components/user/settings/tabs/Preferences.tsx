import { SettingsSectionEnum } from "../SettingsSectionEnum";
import CurrencyForm from "../sections/CurrencyForm";
import ExperiencesForm from "../sections/ExperiencesForm";

type PreferencesProps = {
	data: any,
	showSectionHandler: any,
	clearSectionHandler: any,
	activeSection: SettingsSectionEnum,
	refreshUserData: any
};

export default function Preferences({ data, showSectionHandler, clearSectionHandler, activeSection, refreshUserData }: PreferencesProps) {

	return (
		<>
			<h1 className="page-heading">Preferences</h1>
			<p>Update your currency, language and results preferences for a more customized experience.</p>
			<hr />
			<CurrencyForm
				value={data.currency}
				isFocused={activeSection === SettingsSectionEnum.Currency}
				showSectionHandler={showSectionHandler}
				clearSectionHandler={clearSectionHandler}
				refreshUserData={refreshUserData}
			/>
			<hr />
			<ExperiencesForm
				value={data.experiencesIds}
				isFocused={activeSection === SettingsSectionEnum.Experiences}
				showSectionHandler={showSectionHandler}
				clearSectionHandler={clearSectionHandler}
				refreshUserData={refreshUserData}
			/>
			<hr />
		</>
	);
}