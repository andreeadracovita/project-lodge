import { ChevronLeft } from "react-bootstrap-icons";

import "./FormBackButton.css";

type FormBackButtonProps = {
	onButtonClicked: any
};

export default function FormBackButton({ onButtonClicked }: FormBackButtonProps) {
	return (
		<p onClick={onButtonClicked} className="text-muted back-button"><ChevronLeft /> Back</p>
	);
}
