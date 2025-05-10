import { useSearchParams } from 'react-router';

function Stay() {

	const [searchParams, setSearchParams] = useSearchParams();

	console.log(searchParams.get("adults"));
	console.log(searchParams.get("check_in"));
	console.log(searchParams.get("check_out"));

	return (
		<div className="container">
			<h1>Stay description page</h1>
			<p>Lorem ipsum</p>
		</div>
	);
}

export default Stay;