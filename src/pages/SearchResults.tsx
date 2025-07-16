import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import countries from "react-select-country-list";

import { getPropertiesForQuery } from "/src/api/BackendApiService";
import ListView from "/src/components/list/ListView";
import { ListItemType } from "/src/components/list/ListItemType";

import { getGeolocation } from "/src/api/BackendApiService";
import SearchResultsListView from "/src/components/searchResults/SearchResultsListView";
import SearchResultsMapView from "/src/components/searchResults/SearchResultsMapView";
import { useAuth } from "/src/components/security/AuthContext";
import { getNightsCount } from "/src/utils/DateFormatUtils";
import { convertToPreferredCurrency } from "/src/utils/conversionUtils";

export default function SearchResults() {
	const authContext = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();

	const [isFullscreenMap, setIsFullscreenMap] = useState(false);
	const [properties, setProperties] = useState([]);
	const [budgetProperties, setBudgetProperties] = useState([]);
	const [location, setLocation] = useState();
	const [locationGeo, setLocationGeo] = useState([]);
	const [boundingbox, setBoundingbox] = useState();

	const [propCountString, setPropCountString] = useState("");
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

	useEffect(() => {
		const countryFull = countries().getLabel(searchParams.get("country"));
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
					setLocationGeo([Number(data.lat), Number(data.lon)]);
					setBoundingbox([
						Number(data.boundingbox[0]),
						Number(data.boundingbox[1]),
						Number(data.boundingbox[2]),
						Number(data.boundingbox[3]),
					]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, [searchParams.get("country"), searchParams.get("city")]);

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
		<div>
		{
			isFullscreenMap
			? <SearchResultsMapView
				items={budgetProperties}
				checkInParam={checkInParam}
				checkOutParam={checkOutParam}
				guests={guests}
				nightsCount={nightsCount}
				locationGeo={locationGeo}
				boundingbox={boundingbox}
				propCountString={propCountString}
				setIsFullscreenMap={setIsFullscreenMap}
			/>
			: <SearchResultsListView
				items={budgetProperties}
				checkInParam={checkInParam}
				checkOutParam={checkOutParam}
				guests={guests}
				nightsCount={nightsCount}
				locationGeo={locationGeo}
				locationString={location}
				boundingbox={boundingbox}
				lowestPrice={lowestPrice}
				highestPrice={highestPrice}
				propCountString={propCountString}
				setIsFullscreenMap={setIsFullscreenMap}
			/>
		}
		
		</div>
	);
}
