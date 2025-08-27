import { CalendarRange, GeoAlt, People, Search } from "react-bootstrap-icons";

import "./SearchMobile.css";
import Calendar from "components/calendar/Calendar";
import CountrySelect from "components/common/CountrySelect";
import { dayMonYear } from "utils/dateUtils";

type SearchDesktopProps = {
	input: any,
	handleCountryChange: any,
	handleChange: any,
	onCalendarClick: any,
	onSearchClicked: any
};

export default function SearchDesktop({ input, handleCountryChange, handleChange, onCalendarClick, onSearchClicked }: SearchDesktopProps) {

	return (
		<div>
			<div id="search-bar" className="rounded-pill p-1 px-2 w-100 d-flex align-items-center justify-content-between pill-container">
				<div className="d-flex w-50 align-items-center justify-content-center">
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

				<div className="vr"></div>

				<div className="d-flex w-25 justify-content-center align-items-center">
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

				<div className="vr"></div>

				<div className="d-flex align-items-center w-25 ms-2">
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
					id="search-button"
					type="button"
					className="btn-round"
					onClick={onSearchClicked}
				>
					<Search id="search-icon" color="white" size={20} />
				</button>
			</div>
		</div>
	)
}