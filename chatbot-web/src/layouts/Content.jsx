import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-muted rounded-full animate-pulse" />
        <span className="w-2 h-2 bg-muted rounded-full animate-pulse animate-delay-150" />
        <span className="w-2 h-2 bg-muted rounded-full animate-pulse animate-delay-300" />
      </div>
    </div>
  );
}

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
    <section className="shrink h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-4">
        {messages.map((message, index) => (
          <ChatBubble key={index} text={message.text} isUser={message.isUser} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomAnchorRef} />
      </div>
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
      <div className="max-w-5/6 flex flex-col gap-1">
        <div
          className={`flex ${isUser ? "justify-end" : "justify-start"} text-sm font-semibold`}
        >
          {isUser ? "User" : "Chatbot"}
        </div>
        <div
          className={`px-4 py-2 rounded-lg ${isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
        >
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
