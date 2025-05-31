import { PersonGear, ShieldLock, Sliders } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import PersonalDetails from "/src/components/user/PersonalDetails";
import LoginSecurity from "/src/components/user/LoginSecurity";
import Preferences from "/src/components/user/Preferences";
import Payment from "/src/components/user/Payment";
import Privacy from "/src/components/user/Privacy";
import SettingsNav, { SettingsSection } from "/src/components/user/SettingsNav";

export default function Settings() {
	const iconSize = 30;

	const [searchParams, setSearchParams] = useSearchParams();
	const [activeSection, setActiveSection] = useState();

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
						<PersonalDetails />
					}
					{
						activeSection === SettingsSection.Security &&
						<LoginSecurity />
					}
					{
						activeSection === SettingsSection.Preferences &&
						<Preferences />
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