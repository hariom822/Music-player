import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useQuestionAI from "./Questions";

const Chat = () => {
  const { processQuestion } = useQuestionAI();
  const navigate = useNavigate();
  const { darkMode } = useSelector((s) => s.theme);

  const [openChat, setOpenChat] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const { messages } = useSelector((s) => s.chat);

  const ButtonChat = () => {
    const login = sessionStorage.getItem("loginuser");
    if (!login) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    setOpenChat(true);
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    setThinking(true);
    const questionText = input;
    setInput("");

    setTimeout(() => {
      processQuestion(questionText);
      setThinking(false);
    }, 1500);
  };

  return (
    <>
      {!openChat && (
        <button
          onClick={ButtonChat}
          className={`fixed bottom-5 right-5 z-[999] p-4 rounded-full shadow-xl text-2xl transition
            ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          <FaComments />
        </button>
      )}

      {openChat && (
        <div
          className={`fixed bottom-0 right-0 w-full sm:w-[90%] max-w-[370px] h-[60vh] sm:h-[550px] border rounded-t-xl shadow-2xl flex flex-col z-[999]
            ${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
        >
        
          <div
            className={`flex justify-between items-center px-4 py-3 rounded-t-xl
              ${darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"}`}
          >
            <h2 className="text-xl font-bold">Chat Bar</h2>
            <IoClose
              size={26}
              onClick={() => setOpenChat(false)}
              className="cursor-pointer"
            />
          </div>

          <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? "bg-gray-900" : "bg-white"}`}>
            {messages.length === 0 && !thinking && (
              <p className={`text-center mt-10 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Start asking questions...
              </p>
            )}

            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold text-blue-500">Question:</p>
                <p className={`ml-3 break-words ${darkMode ? "text-gray-200" : ""}`}>{msg.question}</p>

                <p className="font-bold text-green-500 mt-2">Answer:</p>
                <p className={`ml-3 break-words ${darkMode ? "text-gray-200" : ""}`}>{msg.answer}</p>

                <hr className={`my-2 ${darkMode ? "border-gray-700" : "border-gray-300"}`} />
              </div>
            ))}

            {thinking && (
              <div className={`text-center mt-2 italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Thinking...
              </div>
            )}
          </div>
          <div className={`flex flex-col sm:flex-row p-3 gap-2 sm:gap-3 border-t
            ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"}`}
          >
            <input
              type="text"
              placeholder="Ask something..."
              className={`flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400 w-full
                ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-black placeholder-gray-500"}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className={`px-4 py-2 rounded-lg transition w-full sm:w-auto
                ${darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
