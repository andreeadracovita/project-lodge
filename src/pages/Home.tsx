import { useState } from 'react';
import ListView from '../components/ListView';
import MapView from '../components/MapView';
import ViewToggleButton from '../components/ViewToggleButton';

function Home() {
	const [isList, setIsList] = useState(true)

	function toggleView() {
		setIsList(!isList);
	}
	return (
		<>
			{
	          isList ?
	            <>
	              <ListView />
	              <ViewToggleButton isList={true} buttonClick={toggleView} />
	            </> :
	            <>
	              <MapView />
	              <ViewToggleButton isList={false} buttonClick={toggleView} />
	            </>
	        }
		</>
	);
}

export default Home;