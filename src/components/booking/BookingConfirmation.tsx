import { useEffect, useState } from "react";
import { CalendarWeek, GeoAltFill, TelephoneFill } from "react-bootstrap-icons";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";
import countries from "react-select-country-list";

import { getBookingById, getPropertyById, cancelBooking } from "api/BackendApiService";
import BookedPropertyType from "components/booking/BookedPropertyType";
import MapView from "components/map/MapView";
import { checkInTimes, checkOutTimes } from "utils/constants";
import { weekdayMonYear } from "utils/dateUtils";

const BookingStatus = {
	Confirmed: "Confirmed",
	Completed: "Completed",
	Cancelled: "Cancelled",
} as const;
type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export default function BookingConfirmation() {
	const navigate = useNavigate();

	const [booking, setBooking] = useState<any>();
	const [property, setProperty] = useState<any>();
	const [searchParams] = useSearchParams();
	const bookingId = searchParams.get("id");
	const pinCode = searchParams.get("pin");
	const [showCancel, setShowCancel] = useState<boolean>(true);
	const [status, setStatus] = useState<string>("");
	const [googleMapsLink, setGoogleMapsLink] = useState<string>("");

	useEffect(() => {
		if (bookingId && pinCode) {
			getBookingById(parseInt(bookingId), pinCode)
				.then(response => {
					const data = response.data;

					getPropertyById(data.property_id)
						.then(response => {
							if (response.data) {
								const propData = response.data;
								setProperty(propData);
								setGoogleMapsLink(`https://www.google.com/maps/place/${propData.geo.x}N+${propData.geo.y}E`);
							}
						})
						.catch(error => {
							console.error(error);
						});

					setBooking(data);
					setShowCancel(data.booking_status !== "cancelled");

					if (data.booking_status_id === 3) {
						setStatus(BookingStatus.Cancelled);
					} else {
						const today = new Date();
						const checkOut = new Date(data.check_out);
						if (today <= checkOut) {
							setStatus(BookingStatus.Confirmed);
						} else {
							setStatus(BookingStatus.Completed);
							setShowCancel(false);
						}
					}
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, []);

	function handleCancelBookingClick() {
		const payload = {
			confirmation_number: bookingId,
			pin_code: pinCode
		}
		cancelBooking(payload)
			.then(response => {
				if (response.status === 200) {
					setShowCancel(false);
					window.location.reload();
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	
	return (
		<>
			{
				booking && property &&
				<div>
					<div className="text-muted">{status.toUpperCase()}</div>
					<h1 className="page-heading">Your accommodation booking</h1>
					
					<div className="mt-10 border-section highlight w-25">
						<div>Confirmation number: <span className="text-bold">{bookingId}</span></div>
						<div className="mt-6">PIN code: <span className="text-bold">{pinCode}</span></div>
					</div>

					<div className="mt-10 section-heading heading">{property.title}</div>

					<div className="mt-10">
						<div className="d-flex align-items-center">
							<div className="">
								<CalendarWeek size={24} />
							</div>
							<div className="ms-4">
								<div className="text-bold">{weekdayMonYear(new Date(booking.check_in))} — {weekdayMonYear(new Date(booking.check_out))}</div>
								<div>Check-in: {checkInTimes}</div>
								<div>Check-out: {checkOutTimes}</div>
							</div>
						</div>
					</div>

					<div className="mt-10">
						<div className="d-flex align-items-center">
							<div className="">
								<GeoAltFill size={24} />
							</div>
							<div className="ms-4">
								<div className="text-bold">Property address</div>
								<div>Street {property.street} {property.street_no}, {property.city}, {countries().getLabel(property.country)}</div>
								<div><a href={googleMapsLink} target="_blank" className="heading btn-text-underline">Google Map directions</a></div>
							</div>
						</div>
					</div>

					<div className="mt-10">
						<div className="d-flex align-items-center">
							<div className="">
								<TelephoneFill size={24} />
							</div>
							<div className="ms-4">
								<div className="text-bold">Host contact</div>
								<div>Email: {booking.host_email}</div>
							</div>
						</div>
					</div>

					<div className="section-container">
						<div className="section-heading">
							<span>You've booked </span>
							<BookedPropertyType
								rentalTypeId={property.rental_type_id}
								buildingTypeId={property.building_type_id}
							/>
							<span> for {booking.guests} {booking.guests > 1 ? <span>guests</span> : <span>guest</span>}</span>
						</div>
						<div className="mt-6">
							
						</div>
						<div className="heading btn-text-underline" onClick={() => navigate(`/stay?id=${property.id}`)}>
							View accommodation page
						</div>
					</div>

					<div className="section-container">
						<div className="section-heading">Total paid</div>
						<div className="mt-6 property-card-price">
							{
								booking.amount
								? <span>{booking.amount} {booking.currency}</span>
								: <span>-</span>
							}
						</div>
					</div>

					<div className="section-container">
						<div className="section-heading">Area</div>
						<MapView
							id="map"
							height={350}
							center={[property.geo.x, property.geo.y]}
							zoom={15}
							points={[[property.geo.x, property.geo.y]]}
							boundingbox={undefined}
							isEditable={false}
							updatePinPosition={undefined}
							updateIdsMap={undefined}
							handleHighlightItem={undefined}
							shouldShowText={undefined}
							priceMap={undefined}
						/>
					</div>
					{
						showCancel &&
						<button className="btn-pill section-container" onClick={handleCancelBookingClick}>Cancel booking</button>
					}
				</div>
			}
		</>
	);
}