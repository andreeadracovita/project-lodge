import { capitalizeFirstLetter } from "utils/stringUtils";
import { featuresIconMap } from "utils/mappings";

type FeatureProps = {
	name: string
};

export default function Feature({ name }: FeatureProps) {
	
	return (
		<span className="d-flex align-items-center">
			{/*<Icon iconName={featuresIconMap.get(name)} size={isLarge ? 24 : 16} />*/}
			{featuresIconMap.get(name)}
			<span className="ms-1">{capitalizeFirstLetter(name)}</span>
		</span>
	);
}