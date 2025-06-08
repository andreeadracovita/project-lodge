import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { useAuth } from "/src/components/security/AuthContext";
import Avatar from "/src/components/user/Avatar";
import AccountCard from "/src/components/user/AccountCard";
import { SettingsSection } from "/src/components/user/SettingsNav";
import { experienceIconMap } from "/src/utils/mappings";
import { capitalizeFirstLetter } from "/src/utils/StringUtils";

export default function Account() {
	const authContext = useAuth();
	const iconSize = 30;

	const experiences = ["adventure", "culture", "nature", "entertainment", "food"];

	return (
		<div className="container section-container">
			<div className="d-flex align-items-center">
				<Avatar size={60} />
				<h1 className="p-0 m-0 ms-3 page-heading">Hi, {authContext.firstName}</h1>
			</div>

			<div className="section-container">
				<h2>Seeked travel experiences [TODO put user exp from db]</h2>
				{
					experiences.map((exp, i) => {
						return <span key={i} className="features-list-item">
							{ experienceIconMap.get(exp) } { capitalizeFirstLetter(exp) }
						</span>
					})
				}
			</div>

			<div className="section-container">
				<h2>Account and preferences</h2>
				<div className="row g-4">
					<div className="col-4">
						<AccountCard
							iconName="PersonGear"
							iconSize={iconSize}
							title="Personal details"
							desc="Update your contact information"
							url={`/myaccount/settings?section=${SettingsSection.Details}`}
						/>
					</div>
					<div className="col-4">
						<AccountCard
							iconName="ShieldLock"
							iconSize={iconSize}
							title="Login and security"
							desc="Update your contact information"
							url={`/myaccount/settings?section=${SettingsSection.Security}`}
						/>
					</div>
					<div className="col-4">
						<AccountCard
							iconName="Sliders"
							iconSize={iconSize}
							title="Preferences"
							desc="Change language, currency and experiences"
							url={`/myaccount/settings?section=${SettingsSection.Preferences}`}
						/>
					</div>
					<div className="col-4">
						<AccountCard
							iconName="CreditCard"
							iconSize={iconSize}
							title="Payment"
							desc="Add or remove payment methods"
							url={`/myaccount/settings?section=${SettingsSection.Payment}`}
						/>
					</div>
					<div className="col-4">
						<AccountCard
							iconName="ShieldCheck"
							iconSize={iconSize}
							title="Privacy"
							desc="Updatte privacy settings"
							url={`/myaccount/settings?section=${SettingsSection.Privacy}`}
						/>
					</div>
				</div>
			</div>

			<div className="section-container">
				<h2>Travel activity</h2>
				<div className="row">
					<div className="col-4">
						<AccountCard
							iconName="Suitcase"
							iconSize={iconSize}
							title="Trips and bookings"
							desc="Manage current and upcoming trips"
							url="/trips"
						/>
					</div>
					<div className="col-4">
						<AccountCard
							iconName="Heart"
							iconSize={iconSize}
							title="Wishlist"
							desc="Manage your saved destinations"
							url="/wishlist"
						/>
					</div>
					<div className="col-4">
						<AccountCard
							iconName="ChatLeftText"
							iconSize={iconSize}
							title="Reviews [TODO]"
							desc="View and update posted reviews"
							url="#"
						/>
					</div>
				</div>
			</div>

			<div className="section-container">
				<h2>Hosting</h2>
				<div className="row">
					<div className="col-4">
						<AccountCard
							iconName="HouseGear"
							iconSize={iconSize}
							title="Manage your property"
							desc="View and update your listed properties"
							url="/hosting"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
