import classNames from "classnames";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import "./WishlistIcon.css";
import { getIsPropertyWishlisted, toggleWishlistProperty } from "/src/api/BackendApiService";

export default function WishlistIcon({ itemId }) {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		getIsPropertyWishlisted(itemId)
			.then(response => {
				if (response.data) {
					setIsFavorite(response.data.is_wishlisted);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	function handleHeartClick() {
		toggleWishlistProperty(itemId)
			.then(response => {
				if (response.data) {
					setIsFavorite(response.data.is_wishlisted);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}

	const heartClass = classNames(
		"heart-icon",
		{
			"outline-heart-icon": !isFavorite
		}
	);
	
	return (
		<div className="white-circle position-absolute cursor-pointer">
			<Icon.HeartFill
				size={20}
				color={isFavorite ? "#ff3131" : "white"}
				className={heartClass}
				onClick={handleHeartClick}
			/>
		</div>
	);
}