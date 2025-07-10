import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";
import countries from "react-select-country-list";

import { getPropertiesForQuery } from "/src/api/BackendApiService";
import Filter from "/src/components/filter/Filter";
import ListView from "/src/components/list/ListView";
import { ListItemType } from "/src/components/list/ListItemType";
import MapView from "/src/components/map/MapView";
import Search from "/src/components/search/Search";
import { useAuth } from "/src/components/security/AuthContext";
import { getNightsCount } from "/src/utils/DateFormatUtils";
import { genericMapCenter } from "/src/utils/constants";
import { convertToPreferredCurrency } from "/src/utils/conversionUtils";

export default function SearchResults() {
	const authContext = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();

	const [properties, setProperties] = useState([]);
	const [propCountString, setPropCountString] = useState("");
	const [location, setLocation] = useState("");
	const [locationGeo, setLocationGeo] = useState([0, 0]);
	const [points, setPoints] = useState([]);
	const [checkInParam, setCheckInParam] = useState();
	const [checkOutParam, setCheckOutParam] = useState();
	const [guests, setGuests] = useState();
	const [nightsCount, setNightsCount] = useState();

	const [lowestPrice, setLowestPrice] = useState(0);
	const [highestPrice, setHighestPrice] = useState(0);

	useEffect(() => {
		const tempCheckInParam = searchParams.get("check_in");
		const tempCheckOutParam = searchParams.get("check_out");
		setCheckInParam(tempCheckInParam);
		setCheckOutParam(tempCheckOutParam);
		
		const checkInDate = new Date(tempCheckInParam);
		const checkOutDate = new Date(tempCheckOutParam);
		setNightsCount(getNightsCount(checkInDate, checkOutDate));

		const guestsParam = parseInt(searchParams.get("guests"));
		setGuests(guestsParam);

		const payload = {
			country: searchParams.get("country"),
			city: searchParams.get("city"),
			check_in: tempCheckInParam,
			check_out: tempCheckOutParam,
			guests: guestsParam,
			property_type: searchParams.get("ptype"),
			rental_type: searchParams.get("rtype")
		};
		getPropertiesForQuery(payload)
			.then(response => {
				const data = response.data;
				setProperties(data);
				const propCount = data;
				setPropCountString(`${data.length} ${data.length > 1 ? "results" : "result"}`);
				if (data.length > 0) {
					const firstPriceConverted = convertToPreferredCurrency(data[0].price_night_site, authContext.exchangeRate);
					let tempLowestPrice = firstPriceConverted;
					let tempHighestPrice = firstPriceConverted;

					for (let i = 1; i < data.length; i++) {
						const converted = convertToPreferredCurrency(data[i].price_night_site, authContext.exchangeRate);
						tempLowestPrice = Math.min(tempLowestPrice, converted);
						tempHighestPrice = Math.max(tempHighestPrice, converted);
					}
					setLowestPrice(Math.floor(tempLowestPrice));
					setHighestPrice(Math.ceil(tempHighestPrice));
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, [searchParams.get("country"), searchParams.get("city"), searchParams.get("check_in"), searchParams.get("check_out"), searchParams.get("guests")]);

	useEffect(() => {
		const countryCode = searchParams.get("country");
		if (!countryCode) {
			setLocationGeo(genericMapCenter);
			return;
		}
		
		const countryFull = countries().getLabel(countryCode);
		const city = searchParams.get("city");
		if (city) {
			setLocation(city + ", " + countryFull);
		} else {
			setLocation(countryFull);
		}

		const searchQuery = city + "+" + countryFull;
		const apiKey = import.meta.env.VITE_GEOCODE_API_KEY;
		axios.get(`https://geocode.maps.co/search?q=${searchQuery}&api_key=${apiKey}`)
			.then(response => {
				if (response.data.length > 0) {
					const data = response.data[0];
					setLocationGeo([data.lat, data.lon]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, [searchParams.get("country"), searchParams.get("city")]);

	useEffect(() => {
		const points = [];
		properties?.map(p => {
			points.push([p.geo.x, p.geo.y]);
		});
		setPoints(points);
	}, [properties]);

	return (
		<div className="container section-container">
			<Search />
			<div className="section-container row">
				<div className="col-3">
					<div className="position-relative">
						<MapView height={"200px"} center={locationGeo} zoom={6} points={[]} />
						<span className="btn btn-dark rounded-pill position-absolute top-50 start-50 translate-middle d-flex align-items-center">
							<span className="me-2">Show map</span><Icon.Map color="white" />
						</span>
					</div>
					<div className="section-container">
						<Filter
							city={searchParams.get("city")}
							lowestPrice={lowestPrice}
							highestPrice={highestPrice}
						/>
					</div>
				</div>
				<div className="col-9">
					<h1 className="page-heading">{location}: {propCountString} found</h1>
					<div className="d-flex flex-wrap">
						<div className="filter-pill">Filters</div>
						<div className="filter-pill">here</div>
					</div>
					<div className="mt-10">
						<ListView
							listItemType={ListItemType.Property}
							items={properties}
							checkIn={checkInParam}
							checkOut={checkOutParam}
							guests={guests}
							nightsCount={nightsCount}
							cols={3}
							isCompact={false}
						/>
					</div>
				</div>
	        </div>
		</div>
	);
}
