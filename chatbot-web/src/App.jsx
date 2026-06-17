import "./index.css";
import { Content } from "./layouts/Content";
import { Header } from "./layouts/Header";
import { InputBar } from "./layouts/InputBar";
import { useChat } from "./hooks/useChat";

function App() {
  const { messages, loading, error: _, sendMessage: send } = useChat();

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <Header />
      <main className="flex-1 overflow-hidden">
        <Content messages={messages} />
      </main>
      <InputBar sendCallback={send} disabled={loading} />
    </div>
  );
}

export default App;
