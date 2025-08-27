import * as icons from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

import { Icon } from "components/common/Icon";

export const SettingsTab = {
  Details: "details",
  Security: "security",
  Preferences: "preferences",
} as const;
export type SettingsTab = (typeof SettingsTab)[keyof typeof SettingsTab];

type SettingsNavProps = {
	iconName: keyof typeof icons;
	iconSize: number;
	tabName: string;
	settingsTab: SettingsTab;
	activeSection: string | undefined;
};

export default function SettingsNav({ iconName, iconSize, tabName, settingsTab, activeSection }: SettingsNavProps) {
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