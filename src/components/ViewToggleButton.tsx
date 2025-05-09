import "./ViewToggleButton.css";

function ViewToggleButton(props) {

	return (
		<button type="button" className="btn btn-dark rounded-pill position-fixed start-50 translate-middle-x toggle-button" onClick={() => props.buttonClick()}>
			{props.isList ? <span>Show map</span> : <span>Show list</span>}
		</button>
	);
}

export default ViewToggleButton;