import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

type CountrySelectProps = {
	id: string,
	initialValue?: string,
	handleFormChange: any
};

export default function CountrySelect({ id, initialValue, handleFormChange }: CountrySelectProps) {
	const [value, setValue] = useState<any>();
	const options = useMemo(() => countryList().getData(), []);

	useEffect(() => {
		if (initialValue && initialValue !== "") {
			setValue({
				value: initialValue,
				label: countryList().getLabel(initialValue)
			});
		}
	}, [initialValue]);

	const changeHandler = (value: any) => {
		setValue(value);
		handleFormChange(value.value);
	}
	
	return (
		<Select id={id} options={options} value={value} onChange={changeHandler} />
	);
}