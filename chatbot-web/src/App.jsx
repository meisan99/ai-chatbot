import "./index.css";
import { useState } from "react";
import { Content } from "./layouts/Content";
import { Header } from "./layouts/Header";
import { InputBar } from "./layouts/InputBar";

function App() {
  /**
   * @type {[Array<{text: string, isUser: boolean}>, Function(Array<{text: string, isUser: boolean}>) ]} messages - An array of message objects and a function to update the messages
   */
  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", isUser: false },
  ]);

  /**
   * @param {string} message - The message text to send
   */
  function sendMessage(message) {
    setMessages([...messages, { text: message, isUser: true }]);
  }

  return (
    <div className="min-h-screen overflow-x-hidden p-4">
      <Header name="User" />
      <main>
        <Content messages={messages} />
      </main>
      <InputBar sendCallback={sendMessage} />
    </div>
  );
}

export default App;
