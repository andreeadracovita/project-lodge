import { fileStorage } from "utils/constants";

type PropertyAvatarProps = {
	url: string,
	size: number
}

export default function PropertyAvatar({ url, size }: PropertyAvatarProps) {
	
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