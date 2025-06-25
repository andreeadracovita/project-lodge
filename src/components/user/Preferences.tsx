import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "./settings/SettingsSectionEnum";
import CurrencyForm from "./settings/currency/CurrencyForm";
import ExperiencesForm from "./settings/experiences/ExperiencesForm";
import LanguageForm from "./settings/language/LanguageForm";

export default function Preferences({ data, showSection, clearSection, activeSection }) {

	return (
		<>
			<h1 className="page-heading">Preferences</h1>
			<p>Update your preferences</p>
			<hr />
			<CurrencyForm
				value={data.currency}
				isFocused={activeSection === SettingsSectionEnum.Currency}
				showSection={showSection}
				clearSection={clearSection}
			/>
			<hr />
			<LanguageForm
				value={data.language}
				isFocused={activeSection === SettingsSectionEnum.Language}
				showSection={showSection}
				clearSection={clearSection}
			/>
			<hr />
			<ExperiencesForm
				value={data.experiencesIds}
				isFocused={activeSection === SettingsSectionEnum.Experiences}
				showSection={showSection}
				clearSection={clearSection}
			/>
		</>
	);
}