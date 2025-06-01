import AddPropertyForm from "/src/components/property/AddPropertyForm";

export default function PropertyEdit({editMode}) {

	return (
		<div className="container">
			{editMode ? <EditPropertyForm /> : <AddPropertyForm />}
		</div>
	);
}
