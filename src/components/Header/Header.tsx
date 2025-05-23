import * as Icon from "react-bootstrap-icons";
import Search from "./Search";
import "./Header.css";

function Header() {

	const userId = 1;

	const profilePath = `/myaccount`;

	function logoutClicked() {
		console.log("Log out");
	}
	
	return (
		<header className="py-3 mb-3 border-bottom">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<a href="/" className="col-lg-6 d-flex mb-3 mb-md-0 link-body-emphasis text-decoration-none">
						<object data="/icons/icon.svg" type="image/svg+xml" width="40" height="32" role="img" aria-label="brand icon"></object>
						<span className="fs-3 brand-font brand-color-text">Lodge</span>
					</a>
					<div className="col-lg-6 d-flex justify-content-end align-items-center">
						<span className="me-4">CHF</span>
						<span className="me-4 d-flex align-items-center"><Icon.Globe color="black" size={16} className="me-1"/> English (UK)</span>
						<a className="me-4" href="/hosting/property/add">List a property</a>
						<div className="dropdown">
							<div id="dropdown-button" role="button" className="d-flex rounded-pill user-account-button px-2 py-1" data-bs-toggle="dropdown">
								<object data="/menu.svg" type="image/svg+xml" width="32" height="32" role="img" aria-label="menu icon"></object>
								<img src="https://burst.shopifycdn.com/photos/happy-husky.jpg?width=373&format=pjpg&exif=0&iptc=0" alt="mdo" width="32" height="32" className="rounded-circle object-fit-cover" />
							</div>
							
							<ul className="dropdown-menu dropdown-menu-end text-small">
								<li><a className="dropdown-item" href={profilePath}>My account</a></li>
								<li><a className="dropdown-item" href="/wishlist">Wishlist</a></li>
								<li><a className="dropdown-item" href="/trips">Trips</a></li>
								<li><a className="dropdown-item" href="/messages">Messages</a></li>
								<li><hr className="dropdown-divider" /></li>
								<li><a className="dropdown-item" href="/hosting">Property manager</a></li>
								<li><hr className="dropdown-divider" /></li>
								<li><a className="dropdown-item" href="/" onClick={logoutClicked}>Log out</a></li>
								<li><a className="dropdown-item" href="/signuplogin">Sign up or log in</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header