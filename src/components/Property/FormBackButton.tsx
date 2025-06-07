import * as Icon from "react-bootstrap-icons";

import "./FormBackButton.css";
import localisedString from "/src/localisation/en-GB";

export default function FormBackButton({onButtonClicked}) {
	return (
		<p onClick={onButtonClicked} className="text-muted back-button"><Icon.ChevronLeft /> { localisedString["hosting:back"] }</p>
	);
}
