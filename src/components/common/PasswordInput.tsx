import { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";

type PasswordInputProps = {
	id: string,
	name: string,
	value: string,
	handleChange: any
};

export default function PasswordInput({ id, name, value, handleChange }: PasswordInputProps) {
	const [type, setType] = useState("password");

	function handleTypeToggle() {
		if (type === "password") {
			setType("text");
		} else {
			setType("password");
		}
	}
	
	return (
		<div className="d-flex align-items-center mt-10 form-control">
			<input
				id={id}
				type={type}
				className="form-control search-field"
				name={name}
				value={value}
				onChange={handleChange}
				placeholder="Password *"
				autoComplete="off"
				maxLength={50}
			/>
			<div className="mx-2">
			{
				type === "password"
				? <span onClick={handleTypeToggle} className="cursor-pointer">
					<Eye size={26} />
				</span>
				: <span onClick={handleTypeToggle} className="cursor-pointer">
					<EyeSlash size={26} />
				</span>
			}
			</div>
		</div>
	);
}