import * as Icon from "react-bootstrap-icons";

function Footer() {

	const now = new Date();
	const currentYear = now.getFullYear();
	
	return (
		<footer className="border-top fixed-bottom">
			<div className="container my-3">
				<div className="row">
					<div className="col-6">
						<small>© {currentYear} Lodge</small>
					</div>
					<div className="col-6 d-flex justify-content-end">
						<span className="me-4 d-flex align-items-center"><Icon.Globe color="black" size={16} className="me-1"/> English (UK)</span>
						<span>CHF</span>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer