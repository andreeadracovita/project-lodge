import * as Icon from "react-bootstrap-icons";

import "./FormBackButton.css";

export default function FormBackButton({onButtonClicked}) {
	return (
		<p onClick={onButtonClicked} className="text-muted back-button"><Icon.ChevronLeft /> Back</p>
	);
}
