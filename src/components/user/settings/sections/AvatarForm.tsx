import { useState } from "react";

import "./AvatarForm.css";
import { SettingsSectionEnum } from "../SettingsSectionEnum";
import Avatar from "components/user/Avatar";
import { updateUser, uploadAvatar } from "api/BackendApiService";
import { useAuth } from "components/security/AuthContext";

type AvatarFormProps = {
	isFocused: boolean,
	showSectionHandler: any,
	clearSectionHandler: any
};

export default function AvatarForm({ isFocused, showSectionHandler, clearSectionHandler }: AvatarFormProps) {
	const authContext: any = useAuth();
	const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

	function handleAvatarClick(): void {
		showSectionHandler(SettingsSectionEnum.Avatar);
		document.getElementById("avatar-input")?.click();
	}

	function handleUpload(event: any): void {
		const files = Array.from(event.target.files);
		if (files.length > 0) {
			const tempUrl = URL.createObjectURL(files[0] as Blob);
			setAvatarUrl(tempUrl);
		}
	}

	async function handleSubmit(event: any): Promise<void> {
		event.preventDefault();

		const files = event.target.avatar.files;
		if (files.length === 0) {
			clearSectionHandler();
			return;
		}

		const data = new FormData();
		data.append("avatar", files[0]);

		uploadAvatar(data)
			.then(response => {
				updateUser({ img_url: response.data.filename })
					.then(() => {
						clearSectionHandler();
						authContext.setUserConfig();
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch(error => {
				console.error(error);
			});
	}

	function handleDismissClick(): void {
		clearSectionHandler();
		setAvatarUrl(undefined);
	}
	
	return (
		<form onSubmit={handleSubmit}>
			<div className="d-flex flex-wrap justify-content-center">
				<div className="avatar-container d-flex justify-content-center align-items-center w-100">
					<div onClick={handleAvatarClick}>
						<Avatar
							size={52}
							previewAvatar={avatarUrl}
							url={authContext.avatar}
							firstName={authContext.firstName}
						/>
						<input
							id="avatar-input"
							type="file"
							name="avatar"
							onChange={handleUpload}
							accept="image/png, image/jpeg"
						/>
					</div>
				</div>
				{
					isFocused &&
					<div className="d-flex">
						<button className="btn-text-underline" type="submit">Save</button>
						<button className="btn-text-underline ms-2" onClick={handleDismissClick}>Dismiss</button>
					</div>
				}
			</div>
		</form>
	);
}