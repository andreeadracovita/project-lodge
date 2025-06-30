import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

import "./MessagesContainer.css";
import Message from "./Message";

export default function MessagesContainer() {

	const [messages, setMessages] = useState([
		{
			from_email: "email@email.com",
			content: "Message content 1",
			created_at: new Date()
		},
		{
			from_email: "email@email.com",
			content: "Message content 1",
			created_at: new Date()
		},
		{
			from_email: "email@email.com",
			content: "Message content 1",
			created_at: new Date()
		}
	]);
	
	return (
		<div id="messages-container">
			<div className="d-flex justify-content-center">
				<div className="btn-pill">20 March 2025</div>
			</div>
			{
				messages.map((message, i) => <Message key={i} data={message} />)
			}
		</div>
	);
}