import { useSearchParams } from "react-router";

import { Icon } from "/src/components/common/Icon";

export enum SettingsTab {
	Details = "details",
	Security = "security",
	Preferences = "preferences"
};

export default function SettingsNav({ iconName, iconSize, tabName, settingsTab, activeSection }) {
	const [searchParams, setSearchParams] = useSearchParams();

	function isActive(settingsTab: SettingsTab) {
		if (activeSection === settingsTab) {
			return true;
		}
		return false;
	}

	function getStyle(settingsTab: SettingsTab) {
		if (isActive(settingsTab)) {
			return { textDecoration: "underline" };
		}
		return {};
	}

	function updateSearchParams(settingsTab: SettingsTab) {
		searchParams.set("tab", settingsTab);
		setSearchParams(searchParams);
	}
	
	return (
		<div className="m-3 cursor-pointer" onClick={() => updateSearchParams(settingsTab)}>
			<Icon iconName={iconName} size={iconSize} />
			<span className="ms-4 text-bold" style={getStyle(settingsTab)}>{tabName}</span>
		</div>
	);
}