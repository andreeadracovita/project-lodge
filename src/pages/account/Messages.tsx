import ConversationsPanel from "/src/components/messaging/ConversationsPanel";
import MessagesContainer from "/src/components/messaging/MessagesContainer";
import MessageForm from "/src/components/messaging/MessageForm";

export default function Messages() {

	return (
		<div className="container section-container">
			<h1 className="page-heading">Messages</h1>
			<div id="layout-container" className="section-container row">
				<div className="col-4">
					<ConversationsPanel />
				</div>
				<div className="col-8">
					<MessagesContainer />
					<MessageForm />
				</div>
			</div>
		</div>
	);
}
