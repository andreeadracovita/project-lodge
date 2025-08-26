import {
	Luggage,
	Snow,
	Feather,
	Wind,
	CupHot,
	Tv,
	Droplet,
	Justify,
	TriangleHalf,
	Tsunami,
	Water,
	WindowDock,
	PCircle,
	Wifi
} from "react-bootstrap-icons";

export const featuresIconMap = new Map<string, any>([
	["free WiFi", <Wifi />],
	["free parking", <PCircle />],
	["kitchen", <WindowDock />],
	["lake view", <Water />],
	["sea view", <Tsunami />],
	["mountain view", <TriangleHalf />],
	["BBQ facilities", <Justify />],
	["gym equipment", <Droplet />],
	["TV", <Tv />],
	["coffee/tea maker", <CupHot />],
	["patio", <Wind />],
	["garden", <Feather />],
	["AC", <Snow />],
	["luggage storage", <Luggage />]
]);