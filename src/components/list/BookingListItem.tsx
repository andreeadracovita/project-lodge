import { fileStorage } from "/src/utils/constants";

export default function BookingListItem({item}) {
	
	return(
		<div className="col row">
			<div className="col-4">
				<img src={fileStorage + "val-d-orcia.jpg"} className="list-item-photo" />
			</div>
			<div className="col-8">
				<span className="d-block">Title</span>
				<span className="d-block">City, Country</span>
				<span className="d-block">Date</span>
			</div>
		</div>
	);
}