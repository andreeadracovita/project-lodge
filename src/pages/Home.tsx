import ListView from '../components/ListView';
import Search from '../components/Header/Search';

function Home() {
	return (
		<div className="container mt-5">
			<h1 className="brand-color-text brand-font">Where to next, name?</h1>
			<Search />
			<div className="mt-3">
	        	<ListView />
	        </div>
		</div>
	);
}

export default Home;