import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

export default function CountrySelect({ id, initialValue, handleFormChange }) {
	const [value, setValue] = useState();
	const options = useMemo(() => countryList().getData(), []);

	useEffect(() => {
		if (initialValue && initialValue !== "") {
			setValue({
				value: initialValue,
				label: countryList().getLabel(initialValue)
			});
		}
	}, [initialValue]);

	const changeHandler = value => {
		setValue(value);
		handleFormChange(value.value);
	}
	
	return (
		<Select id={id} options={options} value={value} onChange={changeHandler} />
	);
}