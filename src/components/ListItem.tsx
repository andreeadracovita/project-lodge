import * as Icon from "react-bootstrap-icons";
import "./ListItem.css";

function ListItem({ id }) {

	// Query DB for: imgsrc, city, country, price, rating, next availability for 3 days
	
	return (
		<div className="col-12 col-sm-6 col-md-3">
			<img src="https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img mb-2" />
			<div className="row">
				<div className="col-6">
					<p className="lato-bold">City, Country</p>
					<p><span className="lato-bold">150</span> $ night</p>
				</div>
				<div className="col-6 text-end">
					<p><Icon.StarFill color="black" size={16} /> <span className="lato-bold">4.95</span></p>
				</div>
			</div>
		</div>
	);
}

export default ListItem;