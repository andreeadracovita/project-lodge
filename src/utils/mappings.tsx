import {
	Luggage,
	Snow,
	Wind,
	Tv,
	Tsunami,
	Water,
	PCircle,
	Wifi
} from "react-bootstrap-icons";
import { FaDesktop, FaHotTub, FaMountain, FaPaw } from "react-icons/fa";
import { BiSolidFridge } from "react-icons/bi";
import { GiHighGrass } from "react-icons/gi";
import { MdOutdoorGrill } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { PiCookingPotFill } from "react-icons/pi";
import { RiTreeFill } from "react-icons/ri";
import { BsCupHotFill } from "react-icons/bs";

export const featuresIconMap = new Map<string, any>([
	["free WiFi", <Wifi />],
	["free parking", <PCircle />],
	["kitchen", <PiCookingPotFill />],
	["lake view", <Water />],
	["sea view", <Tsunami />],
	["mountain view", <FaMountain />],
	["garden view", <RiTreeFill />],
	["BBQ facilities", <MdOutdoorGrill />],
	["gym equipment", <CgGym />],
	["TV", <Tv />],
	["tea/coffee maker", <BsCupHotFill />],
	["patio", <Wind />],
	["garden", <GiHighGrass />],
	["AC", <Snow />],
	["luggage storage", <Luggage />],
	["hot tub/Jacuzzi", <FaHotTub />],
	["refrigerator", <BiSolidFridge />],
	["dedicated workspace", <FaDesktop />],
	["pets allowed", <FaPaw />]
]);