function HostingHeader() {
	return (
		<div className="d-flex">
			<a className="btn btn-light rounded-pill me-2" href="/hosting">Dashboard</a>
			<a className="btn btn-light rounded-pill me-2" href="/hosting/calendar">Calendar</a>
			<a className="btn btn-light rounded-pill me-2" href="/hosting/listings">Listings</a>
			<a className="btn btn-light rounded-pill me-2" href="/messages">Messages</a>
		</div>
	);
}

export default Hosting;