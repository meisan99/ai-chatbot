import { useState } from "react";

/**
 * @param {Object} Props
 * @param {function(string): void} Props.sendCallback - A function to call when the user sends a message, with the message text as an argument
 * @param {boolean} Props.disabled - A boolean indicating whether the input bar is disabled
 */
export const InputBar = ({ sendCallback, disabled }) => {
  /** @type {[string | null, (value: string) => void]} */
  const [input, setInput] = useState(null);

  return (
    <footer>
      <div className="shrink-0 bg-primary">
        <div className="max-w-5xl  mx-auto px-4 py-2 flex flex-row gap-2 justify-between items-center">
          <div className="flex-1">
            <textarea
              type="text"
              placeholder="Type a message..."
              value={input === null ? "" : input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 bg-white"
            />
          </div>
          <div>
            <button
              className="px-4  bg-secondary text-secondary-foreground border-2 rounded border-black hover:text-muted hover:bg-secondary/80 disabled:text-muted-foreground disabled:bg-secondary/50 disabled:border-muted-foreground"
              disabled={disabled}
              onClick={() => {
                if (input) {
                  sendCallback(input);
                  setInput("");
                }
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
