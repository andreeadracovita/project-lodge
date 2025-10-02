import { useNavigate } from "react-router-dom";
import countries from "react-select-country-list";

import { deletePropertyById, updateProperty } from "api/BackendApiService";
import { fileStorage } from "utils/constants";

type HostingPropertyListItemProps = {
	item: any,
	setNeedsRefresh: any
};

// Component used for rendering a compact property item
export default function HostingPropertyListItem({ item, setNeedsRefresh }: HostingPropertyListItemProps) {
	const navigate = useNavigate();
	const imgUrl = item.images_url_array?.length > 0 ? fileStorage + item.images_url_array[0] : undefined;

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
		<div className="card-item w-100 row">
			<div className="col-6">
				<img src={imgUrl} className="cover-image" />
			</div>
			<div className="col-6">
				<div className="property-card-heading">{item.title}</div>
				<div>{item.city}, {countries().getLabel(item.country)}</div>
				{
					item.is_listed &&
					<div className="text-bold">Listed</div>
				}
				<div className="mt-6">
				{
					item.is_listed
					? <span className="btn-text-underline" onClick={handleViewClick}>View</span>
					: <span className="btn-text-underline" onClick={handleViewClick}>Preview</span>
				}
				</div>
				<div className="mt-4">
				{
					item.is_listed
					? <>
						<span className="btn-pill d-inline-block" onClick={handleEditClick}>Edit</span>
						<span className="btn-pill-outline ms-1" onClick={handleUnpublishClick}>Unpublish</span>
					</>
					: <>
						<span className="btn-pill d-inline-block" onClick={handleEditClick}>Edit to publish</span>
						<span className="btn-pill-outline ms-1" onClick={handleDeleteClick}>Delete</span>
					</>
				}
				</div>
			</div>
		</div>
	)
}