import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const FloatingActionButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    // This is where you would handle sending the message to your backend/API
    console.log("Message sent!");
    e.target.reset();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Interface Modal */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">AI Chat Assistant</h2>
            <button
              onClick={toggleChat}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Message Display Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-80">
            {/* Placeholder Messages */}
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-xl max-w-[85%]">
                Hello! How can I help you today with your tourist registration?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white p-3 rounded-xl max-w-[85%]">
                I have a question about the emergency contact section.
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-xl max-w-[85%]">
                Of course! What would you like to know about it?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white p-3 rounded-xl max-w-[85%]">
                Can I add multiple emergency contacts?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-xl max-w-[85%]">
                Our system currently supports adding one primary emergency contact. However, you can update this information at any time from your profile dashboard.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white p-3 rounded-xl max-w-[85%]">
                Okay, got it. Thanks for the clarification!
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-xl max-w-[85%]">
                You're very welcome! Is there anything else I can assist you with regarding your registration?
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mr-2"
              required
            />
            <button
              type="submit"
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingActionButton;