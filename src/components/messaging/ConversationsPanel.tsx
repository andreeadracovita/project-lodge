import { useState } from "react";

import "./ConversationsPanel.css";
import ConversationTab from "./ConversationTab";

export default function ConversationsPanel() {
	const [conversations, setConversations] = useState([
		{
			booking_id: 1,
			property_title: "Sunshine villa",
			img_url: "00000001_1.jpg",
			check_in: "2025-08-10",
			check_out: "2025-08-15",
			last_message: "This is a very long message for the conversation tab"
		},
		{
			booking_id: 2,
			property_title: "Sunshine villa",
			img_url: "00000001_2.jpg",
			check_in: "2025-02-04",
			check_out: "2025-02-07",
			last_message: "This is a very long message for the conversation tab"
		},
		{
			booking_id: 3,
			property_title: "Sunshine villa",
			img_url: "00000001_3.jpg",
			check_in: "2025-10-10",
			check_out: "2025-10-16",
			last_message: "This is a very long message for the conversation tab"
		}
	]);
	
	return (
		<div id="conversations-panel" className="border-section">
			<div className="text-strong">Message the property</div>
			{
				conversations.map((conversation, i) => <ConversationTab key={i} data={conversation} />)
			}
		</div>
	);
}