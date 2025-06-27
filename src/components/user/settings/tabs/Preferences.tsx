import { SettingsSectionEnum } from "../SettingsSectionEnum";
import CurrencyForm from "../sections/CurrencyForm";
import ExperiencesForm from "../sections/ExperiencesForm";
import LanguageForm from "../sections/LanguageForm";

export default function Preferences({ data, showSectionHandler, clearSectionHandler, activeSection }) {

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
			/>
			<hr />
			<LanguageForm
				value={data.language}
				isFocused={activeSection === SettingsSectionEnum.Language}
				showSectionHandler={showSectionHandler}
				clearSectionHandler={clearSectionHandler}
			/>
			<hr />
			<ExperiencesForm
				value={data.experiencesIds}
				isFocused={activeSection === SettingsSectionEnum.Experiences}
				showSectionHandler={showSectionHandler}
				clearSectionHandler={clearSectionHandler}
			/>
			<hr />
		</>
	);
}