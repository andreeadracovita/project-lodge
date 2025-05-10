import ListItem from "./ListItem";

function ListView() {
	
	return (
		<div className="container position-relative">
			<div className="row cols-1 cols-sm-2 cols-md-4">
				<ListItem id={1} />
				<ListItem id={2} />
				<ListItem id={3} />
				<ListItem id={4} />
				<ListItem id={5} />
				<ListItem id={6} />
				<ListItem id={7} />
				<ListItem id={8} />
				<ListItem id={9} />
				<ListItem id={10} />
			</div>
		</div>
	)
}

export default ListView;