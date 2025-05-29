import axios from "axios";
import { useEffect, useState } from "react";

import { useAuth } from "/src/components/security/AuthContext";
import ListView from "/src/components/ListView";
import Search from "/src/components/Header/Search";

function Home() {
	const authContext = useAuth();

	const [properties, setProperties] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3000/properties")
			.then(response => {
				if (response.data.length > 0) {
					setProperties(response.data);
				}
			})
			.catch(error => {
				console.error(error);
			})
	}, []);

	return (
		<div className="container">
			<h1 className="heading">Find your element
				{
					authContext.firstName &&
					<span>, {authContext.firstName}</span>
				}
			</h1>
			<Search />
			<div className="mt-3">
	        	<ListView properties={properties} cols={4} />
	        </div>
		</div>
	);
}

export default Home;