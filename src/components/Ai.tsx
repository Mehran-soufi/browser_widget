import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

function Ai() {
  const gapgptApiKey = import.meta.env.VITE_GAPGPT_API_KEY; 
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendToGapGPT(msg: string) {
    const trimmedMessage = msg.trim();
    if (!trimmedMessage) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmedMessage }]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.gapgpt.app/v1/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${gapgptApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: trimmedMessage }],
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log("متن پاسخ سرور:", text);
        throw new Error(
          `خطای سرور: ${response.status} ${response.statusText} - ${text}`
        );
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      const reply = data.choices[0].message.content || "پاسخ نامشخص";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("خطا در دریافت پاسخ:", error);
      setError("خطا در دریافت اطلاعات از سرور. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
      setMessage("");
      inputRef.current?.focus();
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3">
      <div className="w-full max-h-[90%] flex flex-col gap-2 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`w-full flex items-center ${
              msg.role === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`w-11/12 px-2 py-1 rounded-full ${
                msg.role === "user" ? "bg-blue-400/30" : "bg-blue-600/30"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="w-full flex items-center justify-end">
            <div className="w-11/12 px-2 py-1 rounded-full bg-blue-600/30 animate-pulse text-slate-400">
              در حال پاسخ‌گویی...
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm text-center flex flex-col items-center gap-1">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 text-blue-500 underline hover:text-blue-700 cursor-pointer "
            >
              تلاش مجدد
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full h-[10%] rounded-full bg-blue-300/30 flex items-center justify-between gap-1 px-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="سوالی دارید؟ بپرسید"
          className="flex-1 p-1 outline-none border-none placeholder:text-slate-300 placeholder:opacity-80"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendToGapGPT(message);
            }
          }}
        />
        <button
          className="xl:opacity-100 opacity-0 flex items-center justify-center border-none outline-none px-3 py-1 rounded-full bg-blue-600 cursor-pointer transition duration-200 hover:bg-blue-700"
          onClick={() => sendToGapGPT(message)}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}

export default Ai;
