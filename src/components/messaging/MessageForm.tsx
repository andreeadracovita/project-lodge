import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import io from "socket.io-client";

import { server } from "/src/api/ApiClient";
import { useAuth } from "/src/components/security/AuthContext";

const socket = io(server);
export default function MessageForm() {
	const authContext = useAuth();
	const [message, setMessage] = useState("");

	function sendMessage() {
		if (message !== "") {
			socket.emit("message", {
				booking_id: 1,
				from_email: authContext.email,
				first_name: authContext.first_name,
				avatar: "user_00000001.jpg",
				is_host: false,
				content: message,
				created_at: new Date()
			});
			setMessage("");
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log("Submit");
		sendMessage();
	}
	
	return (
		<form onSubmit={handleSubmit}>
			<div className="d-flex align-items-center">
				<input
					type="text"
					className="form-control"
					placeholder="Write a message..."
					name="message"
					value={message}
					onChange={(e) => setMessage(event.target.value)}
				/>
				<div className="ms-2">
					<Icon.SendFill size={28} color={"#371590"} onClick={sendMessage} />
				</div>
			</div>
		</form>
	);
}