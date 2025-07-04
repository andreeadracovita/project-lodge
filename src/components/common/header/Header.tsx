import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

import "./Header.css";
import { useAuth } from "/src/components/security/AuthContext";
import Avatar from "/src/components/user/Avatar";
import { availableCurrencies, siteName } from "/src/utils/constants";

export default function Header() {
	const authContext = useAuth();
	const navigate = useNavigate();

	function logoutClicked() {
		authContext.logout();
	}
	
	return (
		<header className="py-3">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<div className="col-lg-6 d-flex">
						<Link to="/" className="mb-3 mb-md-0 link-body-emphasis text-decoration-none">
							<span className="fs-2 brand-font brand-color-text">{ siteName }</span>
						</Link>
					</div>
					<div className="col-lg-6 d-flex justify-content-end align-items-center nav-item-font">
						<div className="dropdown">
							<div id="dropdown-button" role="button" className="me-4" data-bs-toggle="dropdown">
								<span className="btn-pill">{authContext.currency}</span>
							</div>
							<ul className="dropdown-menu dropdown-menu-end text-small">
							{
								availableCurrencies.map((currency, i) => 
									<li key={i}>
										<span className="dropdown-item cursor-pointer" onClick={() => {authContext.setSessionCurrency(currency)}}>
											{currency}
										</span>
									</li>
								)
							}
								
							</ul>
						</div>
						<Link to="/hosting/property/add" className="me-4 btn-pill">List a property</Link>
						{
							!authContext.isAuthenticated &&
							<Link to="/signup-login" className="me-4 btn-pill">Sign up or log in</Link>
						}
						{
							authContext.isAuthenticated &&
							<div className="dropdown">
								<div id="dropdown-button" role="button" className="d-flex rounded-pill user-account-button px-2 py-1" data-bs-toggle="dropdown">
									<object data="/icons/menu.svg" type="image/svg+xml" width="32" height="32" role="img" aria-label="menu icon"></object>
									<Avatar size={32} url={authContext.avatar} firstName={authContext.firstName} />
								</div>
								
								<ul className="dropdown-menu dropdown-menu-end text-small">
									<li><Link to="/myaccount" className="dropdown-item">My account</Link></li>
									<li><Link to="/wishlist" className="dropdown-item">Wishlist</Link></li>
									<li><Link to="/trips" className="dropdown-item">Trips</Link></li>
									<li><Link to="/myaccount/reviews" className="dropdown-item">Reviews</Link></li>
									<li><hr className="dropdown-divider" /></li>
									<li><Link to="/hosting" className="dropdown-item">Property manager</Link></li>
									<li><hr className="dropdown-divider" /></li>
									<li><Link to="/" className="dropdown-item" onClick={logoutClicked}>Log out</Link></li>
								</ul>
							</div>
						}
					</div>
				</div>
			</div>
		</header>
	)
}
