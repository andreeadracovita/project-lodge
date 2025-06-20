import * as Icon from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";

import { siteName } from "/src/utils/constants";

const noFooterPaths = [
	"/hosting/calendar"
];

export default function Footer() {
	const location = useLocation();
	console.log(location.pathname);

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
						</div>
					</div>
				</footer>
			}
		</>
	)
}
