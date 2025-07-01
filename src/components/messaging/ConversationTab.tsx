import "./ConversationTab.css";
import PropertyAvatar from "/src/components/common/PropertyAvatar";

import { dayMonYear } from "/src/utils/DateFormatUtils";

type Prop = {
	booking_id: number,
	property_title: string,
	img_url: string,
	check_in: string,
	check_out: string,
	last_message: string
};

export default function ConversationTab({ data }: Prop) {
	
	return (
		<div className="d-flex align-items-center mt-10">
			<PropertyAvatar url={data.img_url} size={72} />
			<div className="ms-1">
				<div className="text-strong ellipsis">{data.property_title}</div>
				<div>{dayMonYear(new Date(data.check_in))} — {dayMonYear(new Date(data.check_out))}</div>
				<div className="ellipsis">{data.last_message ?? ""}</div>
			</div>
		</div>
	);
}