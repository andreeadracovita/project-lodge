import { useLocation } from "react-router-dom";

import { siteName } from "utils/constants";

const noFooterPaths = [
	"/hosting/calendar",
	"/messages",
	"/search-results"
];

export default function Footer() {
	const location = useLocation();

	const now = new Date();
	const currentYear = now.getFullYear();
	
	return (
		<>
			{
				(!noFooterPaths.includes(location.pathname)) &&
				<footer>
					<div className="container my-3">
						<div className="row">
							<div className="col-6">
								<small>© {currentYear} {siteName}</small>
							</div>
							<div className="col-6 text-end">
								<div>Contact</div>
								<div>Email: andreea.d.racovita@gmail.com</div>
							</div>
						</div>
					</div>
				</footer>
			}
		</>
	)
}
