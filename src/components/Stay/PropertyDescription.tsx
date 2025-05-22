import { useSearchParams } from "react-router";
import MapView from "/src/components/MapView";
import AvailabilitySection from "./AvailabilitySection";

import "./PropertyDescription.css";

function PropertyDescription({property}) {
	const [searchParams, setSearchParams] = useSearchParams();

	const checkIn = searchParams.get("check_in");
	const checkOut = searchParams.get("check_out");

	const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum, nisl et tempus blandit, mauris libero lacinia mi, in luctus velit tellus in nulla. Proin dapibus nulla sem, porta placerat tellus sollicitudin a. Fusce vitae finibus purus. Ut tincidunt dui ac venenatis ullamcorper. Phasellus elementum pretium mauris ac finibus. Nulla sodales leo eros, a ornare tellus interdum imperdiet. Vestibulum odio ipsum, pellentesque at fermentum at, venenatis eget purus. Ut nec sapien ipsum. Sed interdum risus sed risus commodo, id sagittis nunc sodales. Morbi pellentesque, est nec bibendum pulvinar, augue neque vulputate nibh, et sagittis purus turpis eu dui. Integer id felis nec risus accumsan bibendum. Proin auctor justo vel nulla convallis sagittis.\n\nPellentesque nec vehicula ipsum. Integer felis nisl, ornare a dapibus eu, consectetur eu nulla. Aenean semper, mauris eget pulvinar mollis, erat massa tincidunt dolor, sed ullamcorper velit risus vitae sem. Sed rutrum dolor quis odio cursus sagittis. In hac habitasse platea dictumst. Etiam aliquet sollicitudin tincidunt. Pellentesque varius purus eget quam tempus, sit amet cursus nunc varius. Vestibulum felis nunc, vehicula quis maximus non, ultrices vel odio. Aenean sagittis dui vitae arcu vulputate feugiat. Vivamus sagittis nibh id laoreet pretium. Nam pellentesque dui eu odio accumsan, ac placerat urna placerat.";
	const features = ["Free WiFi", "Free parking", "Kitchen"];
	const geo = [8.5410422, 47.3744489];

	return (
		<>
			<p className="section-heading">About this property</p>
			<p>
				{description.replace('\n', <br />)}
			</p>
			<p className="text-muted">Greyed out trimmed</p>
			<p className="btn btn-outline-dark rounded-pill">Show more</p>
			<p className="btn btn-outline-dark rounded-pill">Show less</p>
			<hr />
			<p className="section-heading">Features</p>
			<div>
				{
					features.map((feature, i) => 
						<span key={i} className="features-list-item">{feature}</span>
					)
				}
			</div>
			<hr />
			<AvailabilitySection />
			<hr />
			<p className="section-heading">Review section</p>
			<p className="section-heading">[Stars here]</p>
			<p className="section-heading">[Reviews here]</p>
			<hr />
			<p className="section-heading">Area</p>
			<MapView height={"350px"} center={geo} zoom={10} />
			<hr />
			<p className="section-heading">Things to know</p>
			<div className="row">
				<div className="col-4">
					<p className="lato-bold">House rules</p>
					<p>Check-in after [Time]</p>
					<p>Check-out before [Time]</p>
					<p>[Number] guests maximum</p>
				</div>
				<div className="col-4">
					<p className="lato-bold">Safety & property</p>
				</div>
				<div className="col-4">
					<p className="lato-bold">Cancellation policy</p>
					<p>Cancel before check-in on {checkIn} for a full refund.</p>
				</div>
			</div>
		</>
	);
}

export default PropertyDescription;