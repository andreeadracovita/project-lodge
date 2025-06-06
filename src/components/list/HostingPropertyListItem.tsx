import { fileStorage } from "/src/utils/constants";
import type { PropertyItem } from "./PropertyListItem";
import { deletePropertyById } from "/src/api/LodgeDbApiService";

type HostingPropertyListItemProps = {
	item: PropertyItem,
	setNeedsRefresh: () => void
};

// Component used for rendering a compact property item
export default function HostingPropertyListItem({ item, setNeedsRefresh }: HostingPropertyListItemProps) {
	const imgUrl = item.images_url_array?.length > 0 ? fileStorage + item.images_url_array[0] : null;

	function handleDeleteClick() {
		deletePropertyById(item.id)
			.then(response => {
				if (response.status === 200) {
					setNeedsRefresh(true);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}

	function handleUnpublishClick() {
		// TODO
	}

	return (
		<div className="row">
			<div className="col-6">
				<img src={imgUrl} className="list-item-photo" />
			</div>
			<div className="col-6">
				<p className="lato-bold">{item.title}</p>
				<p>{item.city}, {item.country}</p>
				{
					item.is_listed &&
					<p className="lato-bold">Listed</p>
				}
				{
					item.is_listed
					? <div>
						<span className="btn btn-outline-dark rounded-pill">Edit</span>
						<span className="btn btn-outline-dark rounded-pill">View</span>
						<span className="btn btn-outline-dark rounded-pill" onClick={handleUnpublishClick}>Unpublish</span>
					</div>
					: <div>
						<span className="btn btn-outline-dark rounded-pill">Continue editing</span>
						<span className="btn btn-outline-dark rounded-pill">Preview</span>
						<span className="btn btn-outline-dark rounded-pill" onClick={handleDeleteClick}>Delete</span>
					</div>
				}
			</div>
		</div>
	)
}