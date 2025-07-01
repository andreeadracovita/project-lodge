import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import io from "socket.io-client";

import "./MessagesContainer.css";
import Message from "./Message";
import DayTag from "./DayTag";
import { server } from "/src/api/ApiClient";
import { dayMonYear } from "/src/utils/DateFormatUtils";

const socket = io(server);
export default function MessagesContainer() {
	const [messages, setMessages] = useState([
		{
			from_email: "email@email.com",
			first_name: "Alissa",
			avatar: "user_00000001.jpg",
			is_host: false,
			content: "Message content 1",
			created_at: "2025-07-01T11:03:52.866Z"
		},
		{
			from_email: "email@email.com",
			first_name: "Alissa",
			avatar: "user_00000001.jpg",
			is_host: false,
			content: "Message content 1",
			created_at: "2025-07-01T11:03:52.866Z"
		},
		{
			from_email: "abc@abc.com",
			first_name: "John Doe",
			avatar: "00000001_1.jpg",
			is_host: true,
			content: "Message content 1",
			created_at: "2025-07-01T11:03:52.866Z"
		},
		{
			from_email: "email@email.com",
			first_name: "Alissa",
			avatar: "user_00000001.jpg",
			is_host: false,
			content: "Message content 1",
			created_at: "2025-07-01T11:03:52.866Z"
		}
	]);
	let cachedDate = "";

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});
	}, []);

	useEffect(() => {
		const messagesContainerElement = document.getElementById("messages-container");
		messagesContainerElement.scrollTo(0, messagesContainerElement.clientHeight);
	}, [messages.length]);

	function getContainerHeight() {
		// TODO: fix first render should have message input at bottom even with few messages
		// now is 0 if it does not find layoutElement by id
		const layoutElement = document.getElementById("layout-container");
		const maxHeight = layoutElement?.offsetHeight ?? 0;
		return (maxHeight - 40);
	}
	
	return (
		<div id="messages-container" style={{ height: getContainerHeight() + "px" }}>
			{
				messages.map((message, i) => {
					const date = new Date(message.created_at);
					const formattedDate = dayMonYear(date);
					if (formattedDate !== cachedDate) {
						cachedDate = formattedDate;
						return (
							<div key={i}>
								<DayTag date={date} />
								<Message data={message} />
							</div>
						);
					}
					return <Message key={i} data={message} />
				}
				)
			}
		</div>
	);
}