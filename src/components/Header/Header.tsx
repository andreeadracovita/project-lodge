import * as Icon from "react-bootstrap-icons";
import Search from "./Search";
import "./Header.css";

function Header({showSearch}) {

	const userId = 1;

	const profilePath = `/users/${userId}`;

	const isHost = true;

	function logoutClicked() {
		console.log("Log out");
	}
	
	return (
		<header className="py-3 mb-3 border-bottom fixed-top">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<a href="/" className="col-lg-3 d-flex mb-3 mb-md-0 link-body-emphasis text-decoration-none">
						<object data="/icon.svg" type="image/svg+xml" width="40" height="32" role="img" aria-label="Lodge"></object>
						<span className="fs-3 brand-font brand-color-text">Lodge</span>
					</a>
					<div className="col-lg-6">
						{showSearch && <Search />}
					</div>
					<div className="col-lg-3 d-flex justify-content-end">
						{
							isHost ?
							<a className="btn btn-light rounded-pill me-2" href="/hosting">Switch to hosting</a> :
							<a className="btn btn-light rounded-pill me-2" href="/become-a-host">Become a host</a>
						}
						<div className="dropdown">
							<div id="dropdown-button" role="button" className="d-flex rounded-pill user-account-button px-2 py-1" data-bs-toggle="dropdown">
								<object data="/menu.svg" type="image/svg+xml" width="32" height="32" role="img" aria-label="menu icon"></object>
								<img src="https://burst.shopifycdn.com/photos/happy-husky.jpg?width=373&format=pjpg&exif=0&iptc=0" alt="mdo" width="32" height="32" className="rounded-circle object-fit-cover" />
							</div>
							
							<ul className="dropdown-menu dropdown-menu-end text-small">
								<li><a className="dropdown-item" href={profilePath}>Profile</a></li>
								<li><a className="dropdown-item" href="/trips">Trips</a></li>
								<li><a className="dropdown-item" href="/wishlist">Wishlist</a></li>
								<li><hr className="dropdown-divider" /></li>
								<li><a className="dropdown-item" href="/account-settings">Account settings</a></li>
								<li><a className="dropdown-item" href="/" onClick={logoutClicked}>Log out</a></li>
								<li><a className="dropdown-item" href="/signup-login">Sign up or log in</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header