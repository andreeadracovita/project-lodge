import { PersonGear, ShieldLock, Sliders } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getUserConfig } from "/src/api/BackendApiService";
import PersonalDetails from "/src/components/user/PersonalDetails";
import LoginSecurity from "/src/components/user/LoginSecurity";
import Preferences from "/src/components/user/Preferences";
import Payment from "/src/components/user/Payment";
import Privacy from "/src/components/user/Privacy";
import SettingsNav, { SettingsSection } from "/src/components/user/SettingsNav";

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
	const [activeSection, setActiveSection] = useState();

	useEffect(() => {
		getUserConfig()
			.then(response => {
				const data = response.data;
				console.log(data);
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
		setActiveSection(searchParams.get("section"));
	}, [searchParams.get("section")]);

	return (
		<div className="container section-container">
			<div className="row">
				<div className="col-4">
					<div id="settings-nav" className="border-section">
						<SettingsNav
							iconName="PersonGear"
							iconSize={iconSize}
							tabName="Personal details"
							settingsSection={SettingsSection.Details}
							activeSection={activeSection}
						/>
						<hr />
						<SettingsNav
							iconName="ShieldLock"
							iconSize={iconSize}
							tabName="Login and security"
							settingsSection={SettingsSection.Security}
							activeSection={activeSection}
						/>
						<hr />
						<SettingsNav
							iconName="Sliders"
							iconSize={iconSize}
							tabName="Preferences"
							settingsSection={SettingsSection.Preferences}
							activeSection={activeSection}
						/>
						<hr />
						<SettingsNav
							iconName="CreditCard"
							iconSize={iconSize}
							tabName="Payment"
							settingsSection={SettingsSection.Payment}
							activeSection={activeSection}
						/>
						<hr />
						<SettingsNav
							iconName="ShieldCheck"
							iconSize={iconSize}
							tabName="Privacy"
							settingsSection={SettingsSection.Privacy}
							activeSection={activeSection}
						/>
					</div>
				</div>
				<div id="settings-main" className="col-8">
					{
						activeSection === SettingsSection.Details &&
						<PersonalDetails data={data} />
					}
					{
						activeSection === SettingsSection.Security &&
						<LoginSecurity />
					}
					{
						activeSection === SettingsSection.Preferences &&
						<Preferences data={data} />
					}
					{
						activeSection === SettingsSection.Payment &&
						<Payment />
					}
					{
						activeSection === SettingsSection.Privacy &&
						<Privacy />
					}
				</div>
			</div>
		</div>
	);
}