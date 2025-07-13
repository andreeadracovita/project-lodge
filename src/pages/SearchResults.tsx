import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import * as Icon from "react-bootstrap-icons";
import countries from "react-select-country-list";

import { getGeolocation, getPropertiesForQuery } from "/src/api/BackendApiService";
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
	const [budgetProperties, setBudgetProperties] = useState([]);

	const [propCountString, setPropCountString] = useState("");
	const [location, setLocation] = useState("");
	const [locationGeo, setLocationGeo] = useState(genericMapCenter);
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
			property_type: searchParams.get("ptype") ? searchParams.get("ptype").split(",").map(Number) : null,
			rental_type: searchParams.get("rtype") ? searchParams.get("rtype").split(",").map(Number) : null,
			beds: searchParams.get("beds"),
			bedrooms: searchParams.get("bedrooms"),
			bathrooms: searchParams.get("bathrooms"),
			features: searchParams.get("feat") ? searchParams.get("feat").split(",").map(Number) : null,
			experiences: searchParams.get("exp") ? searchParams.get("exp").split(",").map(Number) : null,
			distance: searchParams.get("dist")
		};

		getPropertiesForQuery(payload)
			.then(response => {
				const data = response.data;
				setProperties(data);
			})
			.catch(error => {
				console.error(error);
			});
	}, [
		searchParams.get("country"),
		searchParams.get("city"),
		searchParams.get("check_in"),
		searchParams.get("check_out"),
		searchParams.get("guests"),
		searchParams.get("ptype"),
		searchParams.get("rtype"),
		searchParams.get("beds"),
		searchParams.get("bedrooms"),
		searchParams.get("bathrooms"),
		searchParams.get("feat"),
		searchParams.get("exp"),
		searchParams.get("dist")
	]);

	// AuthContext exchangeRate may be fetched later from DB
	useEffect(() => {
		if (properties.length > 0) {
			const firstPriceConverted = convertToPreferredCurrency(properties[0].price_night_site, authContext.exchangeRate);
			let tempLowestPrice = firstPriceConverted;
			let tempHighestPrice = firstPriceConverted;

			for (let i = 1; i < properties.length; i++) {
				const converted = convertToPreferredCurrency(properties[i].price_night_site, authContext.exchangeRate);
				tempLowestPrice = Math.min(tempLowestPrice, converted);
				tempHighestPrice = Math.max(tempHighestPrice, converted);
			}
			setLowestPrice(Math.floor(tempLowestPrice));
			setHighestPrice(Math.ceil(tempHighestPrice));

			// TODO reset budget when retrieving new properties?
			// searchParams.delete("plow");
			// searchParams.delete("phigh");
		}
	}, [authContext.exchangeRate, properties]);

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

		const address = city ? city + "+" + countryFull : countryFull;
		getGeolocation(address)
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

	useEffect(() => {
		console.log("update budget props");
		const low = searchParams.get("plow");
		const high = searchParams.get("phigh");
		if (low && high) {
			const temp = properties.filter(prop => {
				const converted = convertToPreferredCurrency(prop.price_night_site, authContext.exchangeRate);
				return (parseInt(low) <= converted && converted <= parseInt(high));
			});
			setBudgetProperties(temp);
			setPropCountString(`${temp.length} ${temp.length > 1 ? "results" : "result"}`);
		} else {
			setBudgetProperties(properties);
			setPropCountString(`${properties.length} ${properties.length > 1 ? "results" : "result"}`);
		}
	}, [properties, authContext.exchangeRate, searchParams.get("plow"), searchParams.get("phigh")]);

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
					<div className="mt-10">
						<ListView
							listItemType={ListItemType.Property}
							items={budgetProperties}
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
