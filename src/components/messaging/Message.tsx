import { useAuth } from "/src/components/security/AuthContext";

export default function Message({ data }) {
	const authContext = useAuth();
	// Messages from curent user are right aligned
	const isLeft = data.from_email !== authContext.email;
	const hours = data.created_at.getHours();
	const minutes = data.created_at.getMinutes();
	const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
	
	return (
		<>
		{
			isLeft
			? <div className="mt-6">
				<div className="border-section w-75">{data.content}</div>
				<div className="mt-6">{formattedTime}</div>
			</div>
			: <div className="mt-6 d-flex flex-wrap justify-content-end">
				<div className="w-100 d-flex justify-content-end">
					<div className="border-section w-75">{data.content}</div>
				</div>
				<div className="mt-6">{formattedTime}</div>
			</div>
		}
		</>
	);
}