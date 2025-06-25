import { useState } from "react";

import "./AvatarForm.css";
import { SettingsSectionEnum } from "../SettingsSectionEnum";
import { formClassNames } from "../formClassNames";
import Avatar from "/src/components/user/Avatar";
import { updateUser, uploadAvatar } from "/src/api/BackendApiService";
import { useAuth } from "/src/components/security/AuthContext";

export default function AvatarForm({ isFocused, showSectionHandler, clearSectionHandler }) {
	const authContext = useAuth();
	const [avatarUrl, setAvatarUrl] = useState();

	function handleAvatarClick(): void {
		showSectionHandler(SettingsSectionEnum.Avatar);
		document.getElementById("avatar-input").click();
	}

	function handleUpload(event: Event): void {
		const files = Array.from(event.target.files);
		if (files.length > 0) {
			const tempUrl = URL.createObjectURL(files[0]);
			setAvatarUrl(tempUrl);
		}
	}

	async function handleSubmit(event): void {
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
		setAvatarUrl(null);
	}
	
	return (
		<form onSubmit={handleSubmit}>
			<div className="d-flex flex-wrap justify-content-center">
				<div className="avatar-container d-flex justify-content-center align-items-center w-100">
					<div onClick={handleAvatarClick}>
						<Avatar size={52} previewAvatar={avatarUrl} />
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