import { useEffect, useState } from "react";

import { SettingsSectionEnum } from "../SettingsSectionEnum";
import PasswordForm from "../sections/PasswordForm";
import { deleteAccount, getPropertiesByUserId } from "api/BackendApiService";
import { useAuth } from "components/security/AuthContext";

type LoginSecurityProps = {
	showSectionHandler: any,
	clearSectionHandler: any,
	activeSection: SettingsSectionEnum
};

export default function LoginSecurity({ showSectionHandler, clearSectionHandler, activeSection }: LoginSecurityProps) {
	const authContext: any = useAuth();
	const [canDelete, setCanDelete] = useState(false);

	useEffect(() => {
		// Check if user account has any associated property
		getPropertiesByUserId()
			.then(response => {
				if (response.data) {
					const publishedPropertiesCount = response.data.length;
					setCanDelete(publishedPropertiesCount === 0);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	function handleDeleteAccount() {
		deleteAccount()
			.then(response => {
				if (response.status === 200) {
					authContext.logout();
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	return (
		<>
			<h1 className="page-heading">Login and security</h1>
			<p>Update your security information.</p>
			<hr />
			<PasswordForm
				isFocused={activeSection === SettingsSectionEnum.Password}
				showSectionHandler={showSectionHandler}
				clearSectionHandler={clearSectionHandler}
			/>
			<hr />
			<div className="btn-text-underline px-3" data-bs-toggle="modal" data-bs-target="#deleteAccountModal">Delete account</div>
			<div
				id="deleteAccountModal"
				className="modal fade"
				tabIndex={-1}
				aria-labelledby="deleteAccountModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							{
								canDelete
								? <span>Are you sure you want to delete this account?</span>
								: <span>Account cannot be deleted because there are properties associated with this account. Delete associated properties first.</span>
							}
						</div>
						<div className="modal-footer">
							{
								canDelete &&
								<div className="btn-pill" onClick={handleDeleteAccount} data-bs-dismiss="modal">Delete</div>
							}
							<div className="btn-pill-outline" data-bs-dismiss="modal">Back</div>
						</div>
					</div>
				</div>
			</div>
			<hr />
		</>
	);
}