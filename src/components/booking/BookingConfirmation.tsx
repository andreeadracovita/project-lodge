import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router-dom";
import countries from "react-select-country-list";

import { getAllFeatures, getBookingById, getPropertyById, cancelBooking } from "/src/api/BackendApiService";
import BookedPropertyType from "/src/components/booking/BookedPropertyType";
import Feature from "/src/components/common/Feature";
import MapView from "/src/components/map/MapView";
import { useAuth } from "/src/components/security/AuthContext";
import { checkInTimes, checkOutTimes } from "/src/utils/constants";
import { weekdayMonYear } from "/src/utils/dateUtils";

enum BookingStatus {
	confirmed = "confirmed",
	completed = "completed",
	cancelled = "cancelled"
}

export default function BookingConfirmation() {
	const authContext = useAuth();
	const navigate = useNavigate();

	const [booking, setBooking] = useState();
	const [property, setProperty] = useState();
	const [searchParams, setSearchParams] = useSearchParams();
	const bookingId = searchParams.get("id");
	const pinCode = searchParams.get("pin");
	const [showCancel, setShowCancel] = useState(true);
	const [status, setStatus] = useState("");
	const [propertyType, setPropertyType] = useState("");
	const [googleMapsLink, setGoogleMapsLink] = useState("");
	const [features, setFeatures] = useState([]);

	useEffect(() => {
		if (bookingId && pinCode) {
			getBookingById(bookingId, pinCode)
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
						setStatus(BookingStatus.cancelled);
					} else {
						const today = new Date();
						const checkIn = new Date(data.check_in);
						const checkOut = new Date(data.check_out);
						if (today <= checkOut) {
							setStatus(BookingStatus.confirmed);
						} else {
							setStatus(BookingStatus.completed);
							setShowCancel(false);
						}
					}
				})
				.catch(error => {
					console.error(error);
				});
			getAllFeatures()
				.then(response => {
					if (response.data) {
						setFeatures(response.data);
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
								<Icon.CalendarWeek size={24} />
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
								<Icon.GeoAltFill size={24} />
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
								<Icon.TelephoneFill size={24} />
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