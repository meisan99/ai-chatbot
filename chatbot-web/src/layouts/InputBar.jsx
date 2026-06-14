import { useState } from "react";

/**
 * @param {Object} Props
 * @param {function(string): void} Props.sendCallback - A function to call when the user sends a message, with the message text as an argument
 */
export const InputBar = ({ sendCallback }) => {
    
  /** @type {[string | null, (value: string) => void]} */
  const [input, setInput] = useState(null);

  return (
    <div>
      <div className="flex">
        <a>
          <input
            type="text"
            placeholder="Type a message..."
            value={input === null ? "" : input}
            onChange={(e) => setInput(e.target.value)}
          />
        </a>
        <a>
          <button
            className="px-4  bg-secondary text-secondary-foreground border-2 rounded border-black hover:text-muted hover:bg-secondary/80"
            onClick={() => {
              if (input) {
                sendCallback(input);
                setInput("");
              }
            }}
          >
            Send
          </button>
        </a>
      </div>
    </div>
  );
};
