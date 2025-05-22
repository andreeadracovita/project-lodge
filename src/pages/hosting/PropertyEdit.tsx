import AddPropertyForm from "/src/components/property/AddPropertyForm";

function PropertyEdit({editMode}) {

	return (
		<div className="container">
			{editMode ? <EditPropertyForm /> : <AddPropertyForm />}
		</div>
	);
}

export default PropertyEdit;