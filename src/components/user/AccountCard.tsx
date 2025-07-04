import { Link } from "react-router-dom";

import { Icon } from "/src/components/common/Icon";

export default function AccountCard({ iconName, iconSize, title, desc, url }) {

	return (
		<Link to={url}>
			<div className="border-section account-card">
				<div className="row">
					<div className="col-10">
						<Icon iconName={iconName} size={iconSize} />
						<p className="lato-bold mt-3">{ title }</p>
						<p>{ desc }</p>
					</div>
					<div className="col-2 d-flex align-items-center justify-content-end">
						<Icon iconName="ChevronRight" size={24} />
					</div>
				</div>
			</div>
		</Link>
	);
}