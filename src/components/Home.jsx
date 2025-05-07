import React, { useState } from "react";
import ChatAI from "./ChatAI";

function Home() {
  const [messages, setMessages] = useState([]);

  const TalkToAi = async () => {
    const promptInput = document.getElementById("promptText");
    const prompt = promptInput?.value || "";

    if (prompt.trim()) {
      setMessages((prev) => [...prev, { from: "self", text: prompt }]);
      promptInput.value = "";

      const loadingMsgId = Date.now();
      setMessages((prev) => [
        ...prev,
        { from: "other", text: "<loading>", id: loadingMsgId },
      ]);

      try {
        const aiResponse = await ChatAI(prompt);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingMsgId
              ? { ...msg, text: aiResponse["response"], id: undefined }
              : msg
          )
        );
      } catch (err) {
        console.error("AI error:", err);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingMsgId
              ? { ...msg, text: "Error fetching AI response.", id: undefined }
              : msg
          )
        );
      }
    } else {
      console.warn("Prompt is empty.");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-sky-100 to-blue-300">

      <header className="w-full bg-blue-900 text-white shadow-md p-4 text-center">
        <h3 className="text-3xl font-bold tracking-wide animate-fade-in">
          🤖 TinyLlama3 AI Chat
        </h3>
      </header>


      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 text-xl">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat ${
              msg.from === "self" ? "chat-end" : "chat-start"
            } animate-slide-up`}
          >
            <div
              className={`chat-bubble ${
                msg.from === "self"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } shadow-md transition-all duration-300`}
            >
              {msg.text === "<loading>" ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                <span className="whitespace-pre-wrap">{msg.text}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <footer className="p-4 bg-white border-t border-gray-300 flex gap-2 shadow-inner">
        <input
          id="promptText"
          className="w-full input input-bordered input-info focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          className="btn btn-info hover:scale-105 transition-transform shadow-md"
          onClick={TalkToAi}
        >
          Send
        </button>
      </footer>
    </div>
  );
}

export default Home;
