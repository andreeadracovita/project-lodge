import { GeoAlt, CalendarRange, People, Search } from "react-bootstrap-icons";

import "./SearchMobile.css";
import Calendar from "components/calendar/Calendar";
import CountrySelect from "components/common/CountrySelect";
import { dayMonYear } from "utils/dateUtils";

type SearchMobileProps = {
	input: any,
	handleCountryChange: any,
	handleChange: any,
	onCalendarClick: any,
	onSearchClicked: any
};

export default function SearchMobile({ input, handleCountryChange, handleChange, onCalendarClick, onSearchClicked }: SearchMobileProps) {

	return (
		<div>
			<div id="search-bar" className="p-0 m-2 border-section">
				<div className="m-2 d-flex align-items-center">
					<GeoAlt size={24} />
					<div className="w-50 ms-2">
						<CountrySelect
							id="country"
							initialValue={input.country}
							handleFormChange={handleCountryChange}
						/>
					</div>
					<input
						id="city"
						type="search"
						className="form-control search-field rounded-pill w-25 ms-2"
						placeholder="City"
						aria-label="city"
						name="city"
						value={input.city}
						onChange={handleChange}
						autoComplete="off"
						required
					/>
				</div>
				<hr />
				<div className="m-2 d-flex align-items-center">
					<CalendarRange size={24} />
					<div
						id="date-range"
						className="dropdown-center d-flex align-items-center cursor-pointer focusable rounded-pill"
						tabIndex={0}
					>
						<div id="dropdown-toggle" className="d-flex px-2 py-1" data-bs-toggle="dropdown">
							<span className="me-2">{input.checkIn ? dayMonYear(new Date(input.checkIn)) : "Check-in"}</span>
							—
							<span className="ms-2">{input.checkOut ? dayMonYear(new Date(input.checkOut)) : "Check-out"}</span>
						</div>
						
						<div className="dropdown-menu p-3" onClick={onCalendarClick}>
							<Calendar />
						</div>
					</div>
				</div>
				<hr />
				<div className="m-2 d-flex align-items-center ms-2">
					<People size={24} />
					<label htmlFor="guests" className="ms-2 mt-0">Guests:</label>
					<input
						id="guests"
						type="number"
						className="form-control search-field rounded-pill w-25"
						aria-label="number of guests"
						name="guests"
						value={input.guests}
						onChange={handleChange}
						required
					/>
				</div>
				<button
					id="search-button-mobile"
					type="button"
					className="btn-rectangle-fill w-100"
					onClick={onSearchClicked}
				>
					<Search id="search-icon" color="white" size={20} />
					<span>Search</span>
				</button>
			</div>
		</div>
	)
}
