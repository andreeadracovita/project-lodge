import { propertyPhotoPrefix } from "/src/utils/constants";
import type { PropertyItem } from "./PropertyListItem";

type HostingPropertyListItemProps = {
	item: PropertyItem
};

// Component used for rendering a compact property item
export default function HostingPropertyListItem({ item }: HostingPropertyListItemProps) {
	const imgUrl = item.images_url_array.length > 0 ? propertyPhotoPrefix + item.images_url_array[0] : null;

	return (
		<div className="row">
			<div className="col-6">
				<img src={imgUrl} className="list-item-photo" />
			</div>
			<div className="col-6">
				<p className="lato-bold">{item.title}</p>
				<p>{item.city}, {item.country}</p>
				<span className="btn btn-dark rounded-pill">Edit</span>
				<span className="btn btn-outline-dark rounded-pill">View</span>
			</div>
		</div>
	)
}