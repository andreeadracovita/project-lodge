import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getPropertiesByUserId, updateProperty } from "api/BackendApiService";

/**
 * HostingCalendarSettings retrieves all managed properties by hostId for dropdown select and sets searchParams
 * to first id in results. This approach maintains selection at page refresh.
 */
export default function HostingCalendarSettings() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [hostedProperties, setHostedProperties] = useState<any[]>([]);
	const [selectedProp, setSelectedProp] = useState<any>();

	const [priceInput, setPriceInput] = useState<number | undefined>();
	const [showEdit, setShowEdit] = useState(false);

	useEffect(() => {
		getPropertiesByUserId()
			.then(response => {
				const data = response.data;
				if (data.length > 0) {
					setHostedProperties(data);
					const firstPropId = data[0].id;
					searchParams.set("id", firstPropId);
					setSearchParams(searchParams);
					const foundPropWithId: any = data.find((p: any) => p.id == firstPropId);
					setSelectedProp(foundPropWithId);
					setPriceInput(foundPropWithId.price_night_local);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function handlePropertyClick(id: number) {
		searchParams.set("id", String(id));
		setSearchParams(searchParams);
		setSelectedProp(hostedProperties.find((p: any) => p.id == id));
	}

	function savePrice() {
		updateProperty(selectedProp.id, {
			price: priceInput
		})
			.then(() => {
				setShowEdit(false);
				window.location.reload();
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	return (
		<div className="border-section">
			<div className="text-bold">Selected property</div>
			{
				(hostedProperties.length > 0 && selectedProp !== undefined) &&
				<div>
					<div className="dropdown">
						<div id="dropdown-properties" role="button" className="btn-pill-outline mt-10" data-bs-toggle="dropdown">
							{selectedProp.title}
						</div>
						
						<ul className="dropdown-menu dropdown-menu-start text-small">
							{hostedProperties.map((p: any, i: number) => {
								return <li
									key={i}
									className="dropdown-item cursor-pointer"
									onClick={() => handlePropertyClick(p.id)}
								>
									{p.title}
								</li>
							})}
						</ul>
					</div>

					<div className="section-heading mt-10">Price settings</div>
					<div className="mt-10">Per night</div>
					{
						showEdit
						? <div>
							<input
								type="text"
								className="form-control rounded-pill"
								name="price"
								value={priceInput}
								onChange={(event: any) => setPriceInput(event.target.value)}
								required
							/>
							<div>{selectedProp.local_currency}</div>
							<div className="mt-6 btn-text-underline" onClick={() => setShowEdit(false)}>Dismiss</div>
							<div className="btn-text-underline" onClick={savePrice}>Save</div>
						</div>
						: <div>
							<div className="property-card-price text-bold">{selectedProp.price_night_local} {selectedProp.local_currency}</div>
							<div className="btn-text-underline" onClick={() => {
								setPriceInput(selectedProp.price_night_local);
								setShowEdit(true);
							}}>Edit price</div>
						</div>
					}
				</div>
			}
		</div>
	);
}