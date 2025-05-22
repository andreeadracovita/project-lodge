import * as Icon from "react-bootstrap-icons";

import "./FormBackButton.css";

function FormBackButton({onButtonClicked}) {
	return (
		<p onClick={onButtonClicked} className="text-muted back-button"><Icon.ChevronLeft /> Back</p>
	);
}

export default FormBackButton;