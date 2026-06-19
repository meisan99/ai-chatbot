#### **Core Structure**



Think of the chatbot UI as 3 main layers stacked vertically — a header, a scrollable message area in the middle, and a fixed input bar at the bottom. The message area grows and shrinks dynamically while the input bar stays anchored.



#### **State Management**



Everything revolves around a messages array in state — each item being an object with at least a role (user/assistant) and content. When a user sends a message, you append to that array, and the UI re-renders to show the new message.



#### **The Message Flow**



User types → updates a local inputText state

User hits send → message object gets pushed into messages, input clears

API call fires → while waiting, you show a "typing" indicator (another piece of state)

Response arrives → assistant message gets appended to messages



#### **Key UX Concepts**



Auto-scroll — use a useRef on the bottom of the message list and call .scrollIntoView() whenever messages changes

Loading state — a boolean like isLoading disables the send button and shows a spinner/typing dots

Message bubbles — conditionally style each message based on its role (left-align assistant, right-align user)



#### **Component Breakdown**



ChatWindow — holds all the state and logic

MessageList — maps over messages and renders each one

MessageBubble — a single message with conditional styling

InputBar — controlled input + send button



#### **Extras to Think About**



Streaming responses (chunked text appearing word by word)

Timestamps on messages

Error states if the API fails

Markdown rendering inside assistant messages

