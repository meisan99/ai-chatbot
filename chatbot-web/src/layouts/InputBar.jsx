import { useState, useEffect, useRef } from "react";

/**
 * @param {Object} Props
 * @param {function(string): void} Props.sendCallback - A function to call when the user sends a message, with the message text as an argument
 * @param {boolean} Props.disabled - A boolean indicating whether the input bar is disabled
 */
export const InputBar = ({ sendCallback, disabled }) => {
  /** @type {[string, (value: string) => void]} */
  const [input, setInput] = useState("");

  /**
   * @type {React.MutableRefObject<HTMLTextAreaElement | null>}
   */
  const textAreaRef = useRef(null);

  useEffect(() => {
    /**
     * @type {HTMLTextAreaElement | null}
     */
    const textArea = textAreaRef.current;

    if (textArea) {
      textArea.style.height = "auto"; // Reset the height to auto to recalculate the scrollHeight
      textArea.style.height = `${Math.min(textArea.scrollHeight, 200)}px`; // Set the height to the scrollHeight, with a maximum of 200px
    }
  }, [input]);

  /**
   * @returns {boolean}
   */
  function trySendInput() {
    if (input) {
      sendCallback(input);
      setInput("");
      return true;
    }

    return false;
  }

  return (
    <footer>
      <div className="shrink-0 bg-primary">
        <div className="max-w-5xl  mx-auto px-4 py-2 flex flex-row gap-2 justify-between items-center">
          <div className="flex-1">
            <textarea
              ref={textAreaRef}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 bg-white"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevents the default behavior of adding a new line
                  trySendInput();
                }
              }}
            />
          </div>
          <div>
            <button
              className="px-4  bg-secondary text-secondary-foreground border-2 rounded border-black hover:text-muted hover:bg-secondary/80 disabled:text-muted-foreground disabled:bg-secondary/50 disabled:border-muted-foreground"
              disabled={disabled}
              onClick={() => trySendInput()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
