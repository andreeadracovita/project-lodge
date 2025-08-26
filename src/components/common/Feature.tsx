import { capitalizeFirstLetter } from "utils/stringUtils";

export default function Feature({ name, isLarge }) {
	
	return (
		<span className="d-flex align-items-center">
			{/*<Icon iconName={featuresIconMap.get(name)} size={isLarge ? 24 : 16} />*/}
			{featuresIconMap.get(name)}
			<span className="ms-1">{capitalizeFirstLetter(name)}</span>
		</span>
	);
}