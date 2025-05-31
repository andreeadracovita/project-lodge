import { useSearchParams } from "react-router";

import { Icon } from "/src/components/Icon";

export enum SettingsSection {
	Details = "details",
	Security = "security",
	Preferences = "preferences",
	Payment = "payment",
	Privacy = "privacy"
};

export default function SettingsNav({ iconName, iconSize, tabName, settingsSection, activeSection }) {
	const [searchParams, setSearchParams] = useSearchParams();

	function isActive(settingsSection: SettingsSection) {
		if (activeSection === settingsSection) {
			return true;
		}
		return false;
	}

	function getStyle(settingsSection: SettingsSection) {
		if (isActive(settingsSection)) {
			return { textDecoration: "underline" };
		}
		return {};
	}

	function updateSearchParams(settingsSection: SettingsSection) {
		searchParams.set("section", settingsSection);
		setSearchParams(searchParams);
	}
	
	return (
		<div className="m-3 cursor-pointer" onClick={() => updateSearchParams(settingsSection)}>
			<Icon iconName={iconName} size={iconSize} />
			<span className="ms-4 lato-bold" style={getStyle(settingsSection)}>{tabName}</span>
		</div>
	);
}