import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";


export default function AccountCard({ icon, title, desc, url }) {
	return (
		<Link to={url}>
			<div className="border-section p-3">
				<div className="row">
					<div className="col-10">
						{ icon }
						<p className="lato-bold mt-3">{ title }</p>
						<p>{ desc }</p>
					</div>
					<div className="col-2 d-flex align-items-center justify-content-end">
						<Icon.ChevronRight size={24} />
					</div>
				</div>
				
			</div>
		</Link>
	);
}