"use client";

import React, { useState } from "react";
import Head from "next/head";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([{ sender: "Chatbot", text: "How can I help you today?" }]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message to the conversation
    setMessages([...messages, { sender: "You", text: userInput }]);

    // Simulate backend response
    // Replace this section with actual backend integration
    /*
    fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    })
      .then(response => response.json())
      .then(data => {
        setMessages([...messages, { sender: "Chatbot", text: data.reply }]);
      })
      .catch(error => console.error('Error:', error));
    */

    // Clear input field
    setUserInput("");
  };

  return (
    <>
      <Head>
        <title>Instructor Chatbot</title>
        <meta name="description" content="Chat with your course assistant" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Instructor Chatbot</h1>
        <div className="bg-white shadow-md rounded-lg w-96 p-6">
          <div className="h-64 border border-gray-300 rounded-md overflow-y-auto p-3 mb-4">
            {messages.map((msg, index) => (
              <p key={index} className={`${msg.sender === "You" ? "text-blue-500" : "text-gray-500"}`}>
                {msg.sender}: {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full border border-gray-300 rounded-md p-2 mb-3"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded-md" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
