import ListView from "/src/components/ListView";
import Search from "/src/components/Header/Search";
import properties from "../Properties.json";

function Home() {
	return (
		<div className="container">
			<h1 className="heading">Where to next, name?</h1>
			<Search />
			<div className="mt-3">
	        	<ListView properties={properties} />
	        </div>
		</div>
	);
}

export default Home;