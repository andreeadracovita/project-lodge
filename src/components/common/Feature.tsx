import { capitalizeFirstLetter } from "utils/stringUtils";
import { featuresIconMap } from "utils/mappings";

type FeatureProps = {
	name: string
};

export default function Feature({ name }: FeatureProps) {
	
	return (
		<span className="d-flex align-items-center">
			{featuresIconMap.get(name)}
			<span className="ms-1">{capitalizeFirstLetter(name)}</span>
		</span>
	);
}