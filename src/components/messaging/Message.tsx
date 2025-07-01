import PropertyAvatar from "/src/components/common/PropertyAvatar";
import { useAuth } from "/src/components/security/AuthContext";
import Avatar from "/src/components/user/Avatar";

export default function Message({ data }) {
	const authContext = useAuth();
	// Messages from curent user are right aligned
	const isLeft = data.from_email !== authContext.email;
	const dateTime = new Date(data.created_at);
	const hours = dateTime.getHours();
	const minutes = dateTime.getMinutes();
	const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
	
	return (
		<>
		{
			isLeft
			? <div className="mt-6 d-flex">
				{
					data.is_host
					? <PropertyAvatar url={data.avatar} size={52} />
					: <Avatar url={data.avatar} size={52} firstName={data.first_name} />
				}
				<div className="ms-2 w-100">
					<div className="border-section w-75">{data.content}</div>
					<div className="mt-6">{formattedTime}</div>
				</div>
			</div>

			: <div className="mt-6 d-flex justify-content-end">
				<div className="me-2 w-100 d-flex flex-wrap justify-content-end">
					<div className="w-100 d-flex justify-content-end">
						<div className="border-section w-75">{data.content}</div>
					</div>
					<div className="mt-6">{formattedTime}</div>
				</div>
				{
					data.is_host
					? <PropertyAvatar url={data.avatar} size={52} />
					: <Avatar url={data.avatar} size={52} firstName={data.first_name} />
				}
			</div>
		}
		</>
	);
}