import { useAuth } from "/src/components/security/AuthContext";
import { userPhotoPrefix } from "/src/constants";

export default function Avatar({ size }) {
	const authContext = useAuth();
	const url = userPhotoPrefix + (authContext.avatar ?? "default.jpg");

	return (
		<img src={url} alt="mdo" width={size} height={size} className="rounded-circle object-fit-cover" />
	);
}