import classNames from "classnames";
import { useEffect, useState } from "react";
import { HeartFill } from "react-bootstrap-icons";

import "./WishlistIcon.css";
import { getIsPropertyWishlisted, toggleWishlistProperty } from "api/BackendApiService";
import { useAuth } from "components/security/AuthContext";

type WishlistIconProps = {
	itemId: number,
	isPreview: boolean
};

export default function WishlistIcon({ itemId, isPreview }: WishlistIconProps) {
	const authContext: any = useAuth();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (!authContext.isAuthenticated || isPreview) {
			return;
		}
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
		if (!authContext.isAuthenticated || isPreview) {
			return;
		}
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
			"outline-heart-icon": !isFavorite && !isPreview
		}
	);
	
	return (
		<div className="white-circle position-absolute cursor-pointer" onClick={handleHeartClick}>
			<HeartFill
				size={20}
				color={isFavorite || isPreview ? "#ff3131" : "white"}
				className={heartClass}
			/>
		</div>
	);
}