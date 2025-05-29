import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { useAuth } from "/src/components/security/AuthContext";
import Avatar from "/src/components/user/Avatar";
import AccountCard from "/src/components/user/AccountCard";

function Account() {
	const authContext = useAuth();
	const iconSize = 30;

	return (
		<div className="container">
			<div className="d-flex align-items-center">
				<Avatar size={60} />
				<h1 className="p-0 m-0 ms-3 h1">Hi, {authContext.firstName}</h1>
			</div>

			<div className="section-container">
				<h2>Seeked travel experiences</h2>
				<span className="features-list-item">🥾 Adventure</span>
				<span className="features-list-item">🏛️ Culture</span>
				<span className="features-list-item">🌲 Nature</span>
			</div>

			<div className="section-container">
				<h2>Account and preferences</h2>
				<div className="row">
					<div className="col-4">
						<AccountCard
							icon={<Icon.PersonGear size={iconSize} />}
							title="Personal details"
							desc="Update your contact information"
							url="#"
						/>
					</div>
					<div className="col-4">
						<AccountCard
							icon={<Icon.ShieldLock size={iconSize} />}
							title="Login and security"
							desc="Update your contact information"
							url="#"
						/>
					</div>
					<div className="col-4">
						<AccountCard
							icon={<Icon.Sliders size={iconSize} />}
							title="Preferences"
							desc="Change language, currency and experiences"
							url="#"
						/>
					</div>
				</div>
			</div>

			<div className="section-container">
				<h2>Travel activity</h2>
				<div className="row">
					<div className="col-4">
						<AccountCard
							icon={<Icon.Suitcase size={iconSize} />}
							title="Trips and bookings"
							desc="Manage current and upcoming trips"
							url="#"
						/>
					</div>
					<div className="col-4">
						<AccountCard
							icon={<Icon.Heart size={iconSize} />}
							title="Wishlist"
							desc="Manage your saved destinations"
							url="#"
						/>
					</div>
					<div className="col-4">
						<AccountCard
							icon={<Icon.ChatLeftText size={iconSize} />}
							title="Reviews"
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
							icon={<Icon.HouseGear size={iconSize} />}
							title="Manage your property"
							desc="View and update your listed properties"
							url="#"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Account;