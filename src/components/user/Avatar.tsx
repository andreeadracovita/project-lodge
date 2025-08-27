import { fileStorage } from "utils/constants";
import "./Avatar.css";

type AvatarProps = {
	url: string | undefined,
	size: number,
	previewAvatar: string | undefined,
	firstName: string | undefined
};

export default function Avatar({ url, size, previewAvatar, firstName }: AvatarProps) {

	return (
		<>
			{
				previewAvatar || url
					? <img
						src={previewAvatar ? previewAvatar : fileStorage + url}
						alt="user avatar"
						width={size}
						height={size}
						className="rounded-circle object-fit-cover" />
					: <div className="avatar-background" style={{ width: size, height: size }}>
						<span
							className="avatar-letter"
							style={{fontSize: size * 0.75, top: size / 6 }}
						>
							{firstName ? firstName[0] : ""}
						</span>
					</div>
			}
		</>
	);
}