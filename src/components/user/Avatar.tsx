import { useAuth } from "/src/components/security/AuthContext";
import { userPhotoPrefix } from "/src/utils/constants";
import "./Avatar.css";

export default function Avatar({ size }) {
	const authContext = useAuth();

	return (
		<>
			{
				authContext.avatar !== undefined && authContext.avatar !== null
					? <img
						src={userPhotoPrefix + authContext.avatar}
						alt="avatar"
						width={size}
						height={size}
						className="rounded-circle object-fit-cover" />
					: <div className="avatar-background" style={{ width: size, height: size }}>
						<span
							className="avatar-letter"
							style={{fontSize: size * 0.75, top: size / 6 }}
						>
							{authContext.firstName ? authContext.firstName[0] : ""}
						</span>
					</div>
			}
		</>
	);
}