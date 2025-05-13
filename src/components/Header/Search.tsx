import * as Icon from "react-bootstrap-icons";
import "./Search.css";

function Search() {
	return (
		<div className="d-flex justify-content-center">
			<form className="mb-3 mb-lg-0 d-flex align-items-center" role="search">
				<div id="search-bar" className="me-2 rounded-pill d-flex p-1">
					<input type="search" className="form-control search-field rounded-pill" placeholder="Where?" aria-label="destination" />
					<div className="vr"></div>
					<input type="search" className="form-control search-field rounded-pill" placeholder="Check-in" aria-label="check-in" />
					<div className="vr"></div>
					<input type="search" className="form-control search-field rounded-pill" placeholder="Check-out" aria-label="check-out" />
					<div className="vr"></div>
					<input type="search" className="form-control search-field rounded-pill" placeholder="Guests" aria-label="number of guests" />
				</div>
				<button type="button" className="btn btn-light rounded-circle brand-color-background search-button p-0 d-flex align-items-center justify-content-center">
					<Icon.Search color="white" size={20}/>
				</button>
			</form>
		</div>
	)
}

export default Search