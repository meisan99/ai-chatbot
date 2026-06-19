import { useEffect, useRef } from "react";

/**
 * @param {Object} Props
 * @param {Array<{text: string, isUser: boolean}>} Props.messages - An array of message objects to display in the chat
 * @param {boolean} Props.isLoading - A boolean indicating whether the chat is loading
 */
export const Content = ({ messages, isLoading }) => {
  /**
   * @type {React.MutableRefObject<HTMLDivElement | null>}
   */
  const bottomAnchorRef = useRef(null);
  useEffect(() => {
    if (bottomAnchorRef.current) {
      bottomAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <section className="shrink h-full overflow-y-auto max-w-5xl mx-auto px-4 py-4">
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <ChatBubble key={index} text={message.text} isUser={message.isUser} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-5/6 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground">Typing...</div>
          </div>  
        )}
      </div>
      <div ref={bottomAnchorRef} />
    </section>
  );
};

/**
 * @param {Object} ChatBubble
 * @param {string} ChatBubble.text - The text to display in the chat bubble
 * @param {boolean} ChatBubble.isUser - Whether the chat bubble is from the user or the chatbot
 */
function ChatBubble({ text, isUser }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-5/6 px-4 py-2 rounded-lg ${isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
      >
        <span className="font-bold">{isUser ? "User" : "Chatbot"}:</span> {text}
      </div>
    </div>
  );
}
