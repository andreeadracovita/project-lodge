import { fileStorage } from "/src/utils/constants";
import type { PropertyItem } from "./PropertyListItem";
import { deletePropertyById, updateProperty } from "/src/api/BackendApiService";
import { useNavigate } from "react-router-dom";

type HostingPropertyListItemProps = {
	item: PropertyItem,
	setNeedsRefresh: () => void
};

// Component used for rendering a compact property item
export default function HostingPropertyListItem({ item, setNeedsRefresh }: HostingPropertyListItemProps) {
	const navigate = useNavigate();
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

	function handleEditClick() {
		navigate(`/hosting/property/edit?id=${item.id}`);
	}

	function handleViewClick() {
		navigate(`/stay?id=${item.id}&guests=2`);
	}

	function handleUnpublishClick() {
		updateProperty(item.id, { is_listed: false })
			.then(() => {
				setNeedsRefresh(true);
			})
			.catch(error => {
				console.error(error);
			});
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
						<span className="btn-text-underline" onClick={handleEditClick}>Edit</span>
						<span className="btn-text-underline" onClick={handleViewClick}>View</span>
						<span className="btn-text-underline" onClick={handleUnpublishClick}>Unpublish</span>
					</div>
					: <div>
						<span className="btn-text-underline" onClick={handleEditClick}>Edit to publish</span>
						<span className="btn-text-underline" onClick={handleViewClick}>Preview</span>
						<span className="btn-text-underline" onClick={handleDeleteClick}>Delete</span>
					</div>
				}
			</div>
		</div>
	)
}