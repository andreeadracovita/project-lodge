import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "./settings/SettingsSectionEnum";
import CurrencyForm from "./settings/currency/CurrencyForm";
import LanguageForm from "./settings/language/LanguageForm";

export default function Preferences({ data }) {
	const [visibleSection, setVisibleSection] = useState(SettingsSectionEnum.None);

	function showSection(section: SettingsSectionEnum): void {
		setVisibleSection(section);
	}

	function clearSection(): void {
		setVisibleSection(SettingsSectionEnum.None);
	}

	return (
		<>
			<h1 className="page-heading">Preferences</h1>
			<p>Update your preferences</p>
			<hr />
			<CurrencyForm
				value={data.currency}
				isFocused={visibleSection === SettingsSectionEnum.Currency}
				showSection={showSection}
				clearSection={clearSection}
			/>
			<hr />
			<LanguageForm
				value={data.language}
				isFocused={visibleSection === SettingsSectionEnum.Language}
				showSection={showSection}
				clearSection={clearSection}
			/>
			<hr />
			<span>Experiences</span>
		</>
	);
}