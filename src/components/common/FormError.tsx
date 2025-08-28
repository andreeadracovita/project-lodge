import { XCircleFill } from "react-bootstrap-icons";

type FormErrorProps = {
	errors: string[]
};

export default function FormError({ errors }: FormErrorProps) {
	
	return (
		<div className="text-red">
		{
			errors.map((error: string, i: number) => <div key={i} className="d-flex align-items-center">
				<XCircleFill size={14} color="#CC0000" />
				<span className="ms-1">{error}</span>
			</div>)
		}
		</div>
	);
}