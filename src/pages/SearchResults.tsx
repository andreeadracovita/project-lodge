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
import { genericMapCenter } from "/src/utils/constants";
import { convertToPreferredCurrency } from "/src/utils/conversionUtils";
import { getNightsCount } from "/src/utils/dateUtils";

export default function SearchResults() {
	const authContext = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();

	const [properties, setProperties] = useState([]);

	// Shared between list and map view
	const [isFullscreenMap, setIsFullscreenMap] = useState(false);
	const [budgetProperties, setBudgetProperties] = useState([]);
	const [geo, setGeo] = useState({
		coordinate: genericMapCenter,
		boundingbox: null
	});
	const [nightsCount, setNightsCount] = useState();

	// Needs to stay here because this is where we have access to all fetched props. Children get only budget props.
	const [priceRange, setPriceRange] = useState([0, 0]);

	useEffect(() => {
		const tempCheckInParam = searchParams.get("check_in");
		const tempCheckOutParam = searchParams.get("check_out");
		
		const checkInDate = new Date(tempCheckInParam);
		const checkOutDate = new Date(tempCheckOutParam);
		const tempNightsCount = getNightsCount(checkInDate, checkOutDate);
		setNightsCount(tempNightsCount);

		const payload = {
			country: searchParams.get("country"),
			city: searchParams.get("city"),
			check_in: tempCheckInParam,
			check_out: tempCheckOutParam,
			guests: parseInt(searchParams.get("guests")),
			property_type: searchParams.get("ptype") ? searchParams.get("ptype").split(",").map(Number) : null,
			rental_type: searchParams.get("rtype") ? searchParams.get("rtype").split(",").map(Number) : null,
			beds: searchParams.get("beds"),
			bedrooms: searchParams.get("bedrooms"),
			bathrooms: searchParams.get("bathrooms"),
			features: searchParams.get("feat") ? searchParams.get("feat").split(",").map(Number) : null,
			experiences: searchParams.get("exp") ? searchParams.get("exp").split(",").map(Number) : null,
			distance: searchParams.get("dist")
		};

		// Fetch
		getPropertiesForQuery(payload)
			.then(response => {
				const data = response.data;
				setProperties(data);
			})
			.catch(error => {
				console.error(error);
			});

		// Update geolocation
		const country = searchParams.get("country");
		const city = searchParams.get("city");

		let address = "";
		if (city) {
			address += city;
		}
		if (country) {
			address += countries().getLabel(country);
		}
		
		if (address !== "") {
			getGeolocation(address)
				.then(response => {
					if (response.data.length > 0) {
						const data = response.data[0];
						setGeo({
							coordinate: [Number(data.lat), Number(data.lon)],
							boundingbox: [
								Number(data.boundingbox[0]),
								Number(data.boundingbox[1]),
								Number(data.boundingbox[2]),
								Number(data.boundingbox[3]),
							]
						});
					}
				})
				.catch(error => {
					console.error(error);
				});
		}
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

	function computeMinMaxPrice() {
		if (properties.length > 0) {
			// Compute lowest price, highest price for budget filter
			const firstPriceConverted = convertToPreferredCurrency(properties[0].price_night_site, authContext.exchangeRate);
			let tempLowestPrice = firstPriceConverted;
			let tempHighestPrice = firstPriceConverted;

			for (let i = 1; i < properties.length; i++) {
				const converted = convertToPreferredCurrency(properties[i].price_night_site, authContext.exchangeRate);
				tempLowestPrice = Math.min(tempLowestPrice, converted);
				tempHighestPrice = Math.max(tempHighestPrice, converted);
			}
			setPriceRange([Math.floor(tempLowestPrice), Math.ceil(tempHighestPrice)]);
		}
	}

	function computeBudgetProperties() {
		if (properties.length === 0 || !nightsCount) {
			return;
		}
		const low = searchParams.get("plow");
		const high = searchParams.get("phigh");
		if (low && high) {
			const temp = properties.filter(prop => {
				const converted = convertToPreferredCurrency(prop.price_night_site, authContext.exchangeRate);
				return (parseInt(low) <= converted && converted <= parseInt(high));
			});
			setBudgetProperties(temp.map(prop => {
				const priceConverted = Math.ceil(convertToPreferredCurrency(Number(prop.price_night_site) * nightsCount, authContext.exchangeRate));
				return {
					...prop,
					price_total_converted: priceConverted
						
				};
			}));
		} else {
			setBudgetProperties(properties.map(prop => {
				const priceConverted = Math.ceil(convertToPreferredCurrency(Number(prop.price_night_site) * nightsCount, authContext.exchangeRate));
				return {
					...prop,
					price_total_converted: priceConverted
						
				};
			}));
		}
	}

	// AuthContext exchangeRate may be fetched later from DB
	useEffect(() => {
		computeMinMaxPrice();
		computeBudgetProperties();
	}, [authContext.exchangeRate, properties]);

	useEffect(() => {
		// When budget range changes, must select new budgetProperties and set new string
		computeBudgetProperties();
	}, [searchParams.get("plow"), searchParams.get("phigh")]);

	return (
		<div>
		{
			isFullscreenMap
			? <SearchResultsMapView
				items={budgetProperties}
				nightsCount={nightsCount}
				geo={geo}
				setIsFullscreenMap={setIsFullscreenMap}
			/>
			: <SearchResultsListView
				items={budgetProperties}
				nightsCount={nightsCount}
				geo={geo}
				priceRange={priceRange}
				setIsFullscreenMap={setIsFullscreenMap}
			/>
		}
		
		</div>
	);
}
