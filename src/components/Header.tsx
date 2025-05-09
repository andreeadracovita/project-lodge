import Search from "./Search";
import * as Icon from "react-bootstrap-icons";

function Header() {
	
	return (
		<header className="py-3 mb-3 border-bottom fixed-top">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<a href="/" className="col-lg-6 d-flex mb-3 mb-md-0 link-body-emphasis text-decoration-none">
						<object data="/icon.svg" type="image/svg+xml" width="40" height="32" role="img" aria-label="Lodge"></object>
						<span className="fs-3 brand-font brand-color-text">Lodge</span>
					</a>
					<div className="col-lg-6 d-flex flex-wrap justify-content-end">
						<button type="button" className="btn btn-light rounded-pill me-2">Rent your place</button>
						<div className="dropdown">
							<div id="dropdown-button" role="button" className="d-flex rounded-pill user-account-button px-2 py-1" data-bs-toggle="dropdown">
								<object data="/menu.svg" type="image/svg+xml" width="32" height="32" role="img" aria-label="menu icon"></object>
								<img src="https://burst.shopifycdn.com/photos/happy-husky.jpg?width=373&format=pjpg&exif=0&iptc=0" alt="mdo" width="32" height="32" className="rounded-circle object-fit-cover" />
							</div>
							
							<ul className="dropdown-menu text-small">
								<li><a className="dropdown-item" href="#">Settings</a></li>
								<li><a className="dropdown-item" href="#">Profile</a></li>
								<li><hr className="dropdown-divider" /></li>
								<li><a className="dropdown-item" href="#">Sign out</a></li>
							</ul>
						</div>
					</div>
				</div>
				<Search />
			</div>
		</header>
	)
}

export default Header