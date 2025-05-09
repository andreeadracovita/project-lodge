function ViewToggleButton(props) {

	return (
		<div >
			<button type="button" className="btn btn-dark rounded-pill position-absolute top-100 start-50 translate-middle-x" onClick={() => props.buttonClick()}>
				{props.isList ? <span>Show map</span> : <span>Show list</span>}
			</button>
		</div>
	);
}

export default ViewToggleButton;