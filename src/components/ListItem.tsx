import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import './ListItem.css';

function ListItem({ id }) {

	// Query DB for: imgsrc, city, country, price, rating, next availability for 3 days
	const isFavorite = true;

	return (
		<div className="col-12 col-sm-6 col-md-3 gy-3">
			<Link
				to={{
					pathname: `/stay/${id}`,
					search: `?adults=1&children=1&check_in=2025-09-01&check_out=2025-09-05`
				}}
			>
				<div className="list-item-card reap-2 position-relative">
					<img src="https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img mb-2" />
					<Icon.HeartFill size={24} color={isFavorite ? "#e3480a" : "#9d9794"} className="bi bi-heart-fill heart-icon position-absolute" />
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
			</Link>
		</div>
	);
}

export default ListItem;