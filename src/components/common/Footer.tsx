import * as Icon from "react-bootstrap-icons";

import { siteName } from "/src/utils/constants";

export default function Footer() {

	const now = new Date();
	const currentYear = now.getFullYear();
	
	return (
		<footer className="border-top">
			<div className="container my-3">
				<div className="row">
					<div className="col-6">
						<small>© {currentYear} {siteName}</small>
					</div>
				</div>
			</div>
		</footer>
	)
}
