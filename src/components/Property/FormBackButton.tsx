import { ChevronLeft } from "react-bootstrap-icons";

import "./FormBackButton.css";

export default function FormBackButton({onButtonClicked}) {
	return (
		<p onClick={onButtonClicked} className="text-muted back-button"><ChevronLeft /> Back</p>
	);
}
