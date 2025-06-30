import ConversationsPanel from "/src/components/messaging/ConversationsPanel";
import MessagesContainer from "/src/components/messaging/MessagesContainer";

export default function Messages() {
	return (
		<div className="container section-container">
			<h1 className="page-heading">Messages</h1>
			<div className="section-container row layout-container">
				<div className="col-4">
					<ConversationsPanel />
				</div>
				<div className="col-8">
					<MessagesContainer />
					<div className="d-flex">
						<input type="text" className="form-control" />
						<button className="ms-2 btn-pill">Send</button>
					</div>
				</div>
			</div>
		</div>
	);
}
