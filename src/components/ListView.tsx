import ListItem from "./ListItem";

function ListView() {
	
	return (
		<div className="container position-relative">
			<div className="row cols-1 cols-sm-2 cols-md-4">
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
			</div>
		</div>
	)
}

export default ListView;