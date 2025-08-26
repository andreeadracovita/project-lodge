import { XCircleFill } from "react-bootstrap-icons";

export default function FormError({ errors }) {
	
	return (
		<div className="text-red">
		{
			errors.map((error, i) => <div key={i} className="d-flex align-items-center">
				<XCircleFill size={14} color="#CC0000" />
				<span className="ms-1">{error}</span>
			</div>)
		}
		</div>
	);
}