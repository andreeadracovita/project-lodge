import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function PasswordInput({ id, name, value, handleChange }) {
	const [type, setType] = useState("password");

	function handleTypeToggle() {
		if (type === "password") {
			setType("text");
		} else {
			setType("password");
		}
	}
	
	return (
		<div className="d-flex align-items-center mt-10 rounded-pill pill-container">
			<input
				id={id}
				type={type}
				className="form-control search-field rounded-pill"
				name={name}
				value={value}
				onChange={handleChange}
				placeholder="Password *"
				autoComplete="off"
			/>
			<div className="mx-2">
			{
				type === "password"
				? <span onClick={handleTypeToggle} className="cursor-pointer">
					<Icon.Eye size={26} />
				</span>
				: <span onClick={handleTypeToggle} className="cursor-pointer">
					<Icon.EyeSlash size={26} />
				</span>
			}
			</div>
		</div>
	);
}