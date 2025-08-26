import "./CallToTravel.css";
import { fileStorage } from "utils/constants";

export default function CallToTravel() {
	
	return (
		<div className="row">
			<div  className="col-4">
				<img src={fileStorage + "call-to-travel.png"} className="call-to-travel-image"/>
			</div>
			<div className="col-8 call-to-travel-section">
				<div>
					<h2 className="section-heading">Where to next?</h2>
					<span className="d-block">You haven't started any trips yet. When you've made a booking, it will appear here.</span>
				</div>
			</div>
		</div>
	);
}