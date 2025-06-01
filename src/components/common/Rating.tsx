import * as Icon from "react-bootstrap-icons";

export default function Rating({score}) {
	return (
		<span className="d-flex align-items-center">
			<Icon.StarFill color="black" size={16} />
			<span className="ms-1 lato-bold">{score ? score : "-"}</span>
		</span>
	);
}
