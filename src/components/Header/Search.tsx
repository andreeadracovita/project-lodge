import * as Icon from "react-bootstrap-icons";
import "./Search.css";

function Search() {
	return (
		<div>
			<form className="mb-3 mb-lg-0 d-flex align-items-center" role="search">
				<div id="search-bar" className="rounded-pill d-flex p-1 w-100">
					<input id="destination" type="search" className="form-control search-field rounded-pill w-75" placeholder="Where?" aria-label="destination" />
					<div className="vr"></div>
					<div className="w-25">
						<label htmlFor="check-in" className="ms-2">Check-in</label>
						<input id="check-in" type="date" className="form-control search-field rounded-pill" placeholder="Check-in" aria-label="check-in" />
					</div>
					<div>
						<label htmlFor="check-out" className="ms-2">Check-out</label>
						<input id="check-out" type="date" className="form-control search-field rounded-pill" placeholder="Check-out" aria-label="check-out" />
					</div>
					<div className="vr"></div>
					<div className="w-50">
						<label htmlFor="guests" className="ms-2">Guests</label>
						<input id="guests" type="number" className="form-control search-field rounded-pill" placeholder="Guests" aria-label="number of guests" />
					</div>
					<button type="button" className="btn btn-light rounded-pill brand-color-background ms-3">
						Search
					</button>
				</div>
				
			</form>
		</div>
	)
}

export default Search