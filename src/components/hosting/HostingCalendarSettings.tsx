import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSearchParams } from "react-router";

enum State {
	Selection,
	Settings
};

export default function HostingCalendarSettings() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [state, setState] = useState(State.Selection);

	function handlePropertyClick() {
		searchParams.set("id", 1); // Prop ID
		setSearchParams(searchParams);
		setState(State.Settings);
	}

	function handleBackClick() {
		searchParams.delete("id");
		setSearchParams(searchParams);
		setState(State.Selection);
	}
	
	return (
		<div className="border-section">
			{
				state === State.Selection &&
				<>
					<div className="section-heading">Manage property</div>
					<div>[Managed properties list here]</div>
				</>
			}
			{
				state === State.Settings &&
				<>
					<div><Icon.ChevronLeft /> Choose another property</div>
					<div className="section-heading">Prop title</div>
				</>
			}
		</div>
	);
}