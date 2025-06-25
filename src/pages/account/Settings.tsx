import { PersonGear, ShieldLock, Sliders } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getUserConfig } from "/src/api/BackendApiService";
import PersonalDetails from "/src/components/user/settings/tabs/PersonalDetails";
import LoginSecurity from "/src/components/user/settings/tabs/LoginSecurity";
import Preferences from "/src/components/user/settings/tabs/Preferences";
import Payment from "/src/components/user/settings/tabs/Payment";
import Privacy from "/src/components/user/settings/tabs/Privacy";
import SettingsNav, { SettingsTab } from "/src/components/user/SettingsNav";
import { SettingsSectionEnum } from "/src/components/user/settings/SettingsSectionEnum";

export default function Settings() {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		nationality: "",
		currency: "",
		language: "",
		experiencesIds: []
	});
	const iconSize = 30;

	const [searchParams, setSearchParams] = useSearchParams();
	const [activeTab, setActiveTab] = useState();
	const [activeSection, setActiveSection] = useState(SettingsSectionEnum.None);

	useEffect(() => {
		getUserConfig()
			.then(response => {
				const data = response.data;
				setData(prevVal => {
					return {
						firstName: data.first_name,
						lastName: data.last_name,
						email: data.email,
						nationality: data.country_code,
						currency: data.currency,
						language: data.language,
						experiencesIds: data.experiences_ids
					}
				})
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	useEffect(() => {
		setActiveTab(searchParams.get("tab"));
	}, [searchParams.get("tab")]);

	function showSectionHandler(section: SettingsSectionEnum): void {
		setActiveSection(section);
	}

	function clearSectionHandler(): void {
		setActiveSection(SettingsSectionEnum.None);
	}

	return (
		<div className="container section-container">
			<div className="row">
				<div className="col-4">
					<div id="settings-nav" className="border-section">
						<SettingsNav
							iconName="PersonGear"
							iconSize={iconSize}
							tabName="Personal details"
							settingsTab={SettingsTab.Details}
							activeSection={activeTab}
						/>
						<hr />
						<SettingsNav
							iconName="ShieldLock"
							iconSize={iconSize}
							tabName="Login and security"
							settingsTab={SettingsTab.Security}
							activeSection={activeTab}
						/>
						<hr />
						<SettingsNav
							iconName="Sliders"
							iconSize={iconSize}
							tabName="Preferences"
							settingsTab={SettingsTab.Preferences}
							activeSection={activeTab}
						/>
						<hr />
						<SettingsNav
							iconName="CreditCard"
							iconSize={iconSize}
							tabName="Payment"
							settingsTab={SettingsTab.Payment}
							activeSection={activeTab}
						/>
						<hr />
						<SettingsNav
							iconName="ShieldCheck"
							iconSize={iconSize}
							tabName="Privacy"
							settingsTab={SettingsTab.Privacy}
							activeSection={activeTab}
						/>
					</div>
				</div>
				<div id="settings-main" className="col-8">
					{
						activeTab === SettingsTab.Details &&
						<PersonalDetails
							data={data}
							showSectionHandler={showSectionHandler}
							clearSectionHandler={clearSectionHandler}
							activeSection={activeSection}
						/>
					}
					{
						activeTab === SettingsTab.Security &&
						<LoginSecurity
							data={data}
							showSectionHandler={showSectionHandler}
							clearSectionHandler={clearSectionHandler}
							activeSection={activeSection}
						/>
					}
					{
						activeTab === SettingsTab.Preferences &&
						<Preferences
							data={data}
							showSectionHandler={showSectionHandler}
							clearSectionHandler={clearSectionHandler}
							activeSection={activeSection}
						/>
					}
					{
						activeTab === SettingsTab.Payment &&
						<Payment />
					}
					{
						activeTab === SettingsTab.Privacy &&
						<Privacy />
					}
				</div>
			</div>
		</div>
	);
}