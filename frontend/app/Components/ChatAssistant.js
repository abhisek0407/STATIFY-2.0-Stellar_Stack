"use client";

import { useEffect, useRef, useState } from "react";
import chatData from "../../dummyChat.json";

const ChatAssistant = () => {
  // Conversation messages
  const [messages, setMessages] = useState(chatData.messages);

  // User input
  const [input, setInput] = useState("");

  // Auto Scroll
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send Message
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      message: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Display user message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Clear textbox
    setInput("");

    // Dummy AI Response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        message:
          "This is a dummy AI response. Once FastAPI is connected, the real response will appear here.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className=" bg-gradient-to-b from-[#17103c] to-[#121827] rounded-2xl border border-indigo-700 shadow-xl flex flex-col h-[720px] xl:h-[760px] 2xl:h-[820px] ">
      {/* Header */}

      <div className="border-b border-indigo-800 p-5 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-indigo-900 flex justify-center items-center">
          <i className="fa-solid fa-robot text-cyan-400 text-xl"></i>
        </div>

        <div>
          <h2 className="text-lg lg:text-xl font-bold text-white">AI Chat Assistant</h2>

          <p className="text-xs lg:text-sm text-gray-400">
            Session : {chatData.session_id.substring(0, 10)}...
          </p>
        </div>
      </div>

      {/* Conversation */}

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[88%] lg:max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${msg.sender === "user"? "bg-gradient-to-r from-cyan-600 to-blue-600 rounded-br-sm": "bg-gradient-to-r from-indigo-700 to-violet-700 rounded-bl-sm"}`}>
              <p className="font-semibold text-cyan-200 mb-2">
                {msg.sender === "user" ? "You" : "FantasyPilot AI"}
              </p>

             <p className="text-sm lg:text-base text-white leading-6 lg:leading-7">{msg.message}</p>

              <p className="text-xs text-right mt-2 text-gray-300">
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}

      <div className="border-t border-indigo-800 p-3 lg:p-4">
        <div className="flex items-center gap-2 lg:gap-3">
          <input
            type="text"
            placeholder="Ask FantasyPilot..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 min-w-0 bg-[#1a1442] border border-indigo-700 rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-500"
          />

          <button
            onClick={handleSend}
             className="flex-shrink-0 bg-cyan-500 hover:bg-cyan-600 w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex justify-center items-center transition"
          >
            <i className="fa-solid fa-paper-plane text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
