import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

import { getIsPropertyWishlisted, toggleWishlistProperty } from "/src/api/LodgeDbApiService";

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
	
	return (
		<Icon.HeartFill
			size={24}
			color={isFavorite ? "#ff3131" : "#9d9794"}
			className="bi bi-heart-fill heart-icon position-absolute cursor-pointer"
			onClick={handleHeartClick}
		/>
	);
}