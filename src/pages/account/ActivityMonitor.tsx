import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
	authorizeAdmin,
	deletePropertyWithIdAsAdmin,
	getAllPropertiesAsAdmin
} from "api/BackendApiService";
import { useAuth } from "components/security/AuthContext";
import { fileStorage } from "utils/constants";

export default function ActivityMonitor() {
	const authContext: any = useAuth();
	const navigate = useNavigate();

	const [properties, setProperties] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	let propToDelete: undefined | number;

	useEffect(() => {
		if (!authContext.isAuthenticated) {
			navigate("/");
			return;
		}

		authorizeAdmin()
			.then(response => {
				if (response.data.authorized && response.data.authorized === true) {
					getAllPropertiesAsAdmin()
						.then(propertiesResponse => {
							setProperties(propertiesResponse.data);
						})
						.catch(error => {
							console.error(error);
						});
				} else {
					navigate("/");
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function deleteProperty() {
		if (propToDelete === undefined) {
			return;
		}

		deletePropertyWithIdAsAdmin(propToDelete)
			.then(response => {
				if (response.status === 200) {
					setShowAlert(true);
					setTimeout(() => setShowAlert(false), 1500);
					propToDelete = undefined;
				}
			});
	}
	
	return (
		<div className="container section-container">
			<h1 className="page-heading">Activity monitor</h1>
			<div>{properties.length} properties</div>
			{
				showAlert &&
				<div className="alert alert-success" role="alert">Property successfully deleted!</div>
			}
			<table className="section-container table">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Title (link)</th>
						<th scope="col">Host</th>
						<th scope="col">Photos</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{
						properties.map((prop: any) => <tr key={prop.id}>
								<th scope="row">{prop.id}</th>
								<td><Link to={`/stay?id=${prop.id}`}>{prop.title}</Link></td>
								<td>{prop.host_email}</td>
								<td>{
									prop.images_url_array.map((url: any, index: number) =>
										<img key={index} src={fileStorage + url} className="thumbnail-image me-1" />
									)
								}</td>
								<td>
									<div
										className="btn-text-underline"
										data-bs-toggle="modal"
										data-bs-target="#deletePropertyModal"
										onClick={() => { propToDelete = prop.id; }}
									>
										Delete
									</div>
								</td>
							</tr>
						)
					}
				</tbody>
			</table>
			<div
				id="deletePropertyModal"
				className="modal fade"
				tabIndex={-1}
				aria-labelledby="deletePropertyModalLabel"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
						{
							<span>Are you sure you want to delete this property? (delete only inappropriate properties for demo purposes)</span>
						}
						</div>
						<div className="modal-footer">
							<div className="btn-pill" onClick={deleteProperty} data-bs-dismiss="modal">Delete</div>
							<div className="btn-pill-outline" data-bs-dismiss="modal">Back</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}