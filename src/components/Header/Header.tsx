import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

import { useAuth } from "/src/components/security/AuthContext";
import Avatar from "/src/components/user/Avatar";
import "./Header.css";
import { siteName } from "/src/constants";

function Header() {
	const authContext = useAuth();
	const navigate = useNavigate();

	function logoutClicked() {
		navigate("/"); // TODO: wire properly
		authContext.logout();
	}
	
	return (
		<header className="py-3 border-bottom">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<Link to="/" className="col-lg-6 d-flex mb-3 mb-md-0 link-body-emphasis text-decoration-none">
						<object data="/icons/icon.svg" type="image/svg+xml" width="40" height="32" role="img" aria-label="brand icon"></object>
						<span className="fs-3 brand-font brand-color-text">{ siteName }</span>
					</Link>
					<div className="col-lg-6 d-flex justify-content-end align-items-center">
						<span className="me-4">{authContext.currency}</span>
						<span className="me-4 d-flex align-items-center"><Icon.Globe color="black" size={16} className="me-1"/>{authContext.language}</span>
						<Link to="/hosting/property/add" className="me-4">List a property</Link>
						{
							!authContext.isAuthenticated &&
							<Link to="/signuplogin" className="me-4" >Sign up or log in</Link>
						}
						{
							authContext.isAuthenticated &&
							<div className="dropdown">
								<div id="dropdown-button" role="button" className="d-flex rounded-pill user-account-button px-2 py-1" data-bs-toggle="dropdown">
									<object data="/icons/menu.svg" type="image/svg+xml" width="32" height="32" role="img" aria-label="menu icon"></object>
									<Avatar size={32} />
								</div>
								
								<ul className="dropdown-menu dropdown-menu-end text-small">
									<li><Link to="/myaccount" className="dropdown-item">My account</Link></li>
									<li><Link to="/wishlist" className="dropdown-item">Wishlist</Link></li>
									<li><Link to="/trips" className="dropdown-item">Trips</Link></li>
									<li><Link to="/messages" className="dropdown-item">Messages</Link></li>
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

export default Header