import { useAuth } from "components/security/AuthContext";
import Avatar from "components/user/Avatar";
import AccountCard from "components/user/AccountCard";
import { SettingsTab } from "components/user/SettingsNav";

export default function Account() {
	const authContext: any = useAuth();
	const iconSize = 30;

	return (
		<div className="container section-container">
			<div className="d-flex align-items-center">
				<Avatar size={60} url={authContext.avatar} firstName={authContext.firstName} previewAvatar={undefined} />
				<h1 className="p-0 m-0 ms-3 page-heading">Hi, {authContext.firstName}</h1>
			</div>

			<div className="section-container">
				<h2 className="section-heading">Account and preferences</h2>
				<div className="row g-4">
					<div className="col-4">
						<AccountCard
							iconName="PersonGear"
							iconSize={iconSize}
							title="Personal details"
							desc="Update your contact information"
							url={`/myaccount/settings?tab=${SettingsTab.Details}`}
						/>
					</div>
					<div className="col-4">
						<AccountCard
							iconName="ShieldLock"
							iconSize={iconSize}
							title="Login and security"
							desc="Update your contact information"
							url={`/myaccount/settings?tab=${SettingsTab.Security}`}
						/>
					</div>
					<div className="col-4">
						<AccountCard
							iconName="Sliders"
							iconSize={iconSize}
							title="Preferences"
							desc="Change language, currency and experiences"
							url={`/myaccount/settings?tab=${SettingsTab.Preferences}`}
						/>
					</div>
					<div className="col-4">
						<AccountCard
							iconName="Trash3"
							iconSize={iconSize}
							title="Delete account"
							desc="Delete the current account"
							url={`/myaccount/settings?tab=${SettingsTab.Security}`}
						/>
					</div>
				</div>
			</div>

			<div className="section-container">
				<h2 className="section-heading">Travel activity</h2>
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
							title="Reviews"
							desc="View and update posted reviews"
							url="/myaccount/reviews"
						/>
					</div>
				</div>
			</div>

			<div className="section-container">
				<h2 className="section-heading">Hosting</h2>
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
