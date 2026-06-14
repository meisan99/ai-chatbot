/**
 * @param {Object} Props
 * @param {Array<{text: string, isUser: boolean}>} Props.messages - An array of message objects to display in the chat
 */
export const Content = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <ChatBubble key={index} text={message.text} isUser={message.isUser} />
      ))}
    </div>
  );
};

/**
 * @param {Object} ChatBubble
 * @param {string} ChatBubble.text - The text to display in the chat bubble
 * @param {boolean} ChatBubble.isUser - Whether the chat bubble is from the user or the chatbot
 */
function ChatBubble({ text, isUser }) {
  return (
    <div>
      <div>
        <span>{isUser ? "User" : "Chatbot"}:</span> {text}
      </div>
    </div>
  );
}
