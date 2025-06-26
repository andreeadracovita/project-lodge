import { fileStorage } from "/src/utils/constants";

export default function PropertyAvatar({ url, size }) {
	
	return (
		<img
			src={fileStorage + url}
			alt="property avatar"
			width={size}
			height={size}
			className="rounded-circle object-fit-cover"
		/>
	);
}