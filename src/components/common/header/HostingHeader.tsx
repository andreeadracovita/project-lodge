import { Link } from "react-router-dom";

export default function HostingHeader() {
	return (
		<div className="d-flex justify-content-center">
			<Link to="/hosting" className="btn btn-light me-2">Dashboard</Link>
			<Link to="/hosting/calendar" className="btn btn-light me-2">Calendar</Link>
			<Link to="/hosting/properties" className="btn btn-light me-2">Properties</Link>
			<Link to="/hosting/messages" className="btn btn-light me-2">Messages</Link>
		</div>
	);
}
