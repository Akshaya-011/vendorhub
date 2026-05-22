import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Store, Megaphone, Image as ImageIcon, MessageSquare, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SUGGESTIONS = [
  { icon: Store, label: 'Write a product description for a handmade leather wallet' },
  { icon: Megaphone, label: 'Create an email campaign for a summer sale' },
  { icon: ImageIcon, label: 'Suggest an image layout for my landing page' },
  { icon: MessageSquare, label: 'Draft a professional response to a 5-star customer review' },
];

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your VendorHub AI Co-Pilot. I can help you write copy, generate marketing ideas, analyze your data, or even update your website design. How can I help you today?",
    }
  ]);
  
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/v1/ai/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && token !== 'simulated_token' ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          vendorId: user?.id || 'demo_vendor',
          prompt: userMessage,
          businessProfile: user?.storeName || 'Vendor Store'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.data.message
        }]);
      } else {
        throw new Error(data.message || 'Failed to communicate with AI server');
      }
    } catch (error) {
      console.warn('AI Backend failed, using local offline fallback:', error);
      
      // Offline fallback simulation
      await new Promise(r => setTimeout(r, 1500));
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I am currently running in offline mode. In production, this prompt would generate a custom marketing strategy, product description, or design update via the OpenAI integration."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary rounded-xl flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">AI Co-Pilot</h1>
            <p className="text-xs text-emerald-600 font-medium flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              Online and ready
            </p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          Clear Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/30">
        
        {messages.length === 1 && (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto mt-4">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s.label)}
                className="flex items-center p-3 text-left bg-white border border-gray-200 rounded-xl hover:border-primary-400 hover:shadow-md transition-all group"
              >
                <div className="p-2 bg-primary-50 rounded-lg text-primary-600 group-hover:bg-primary-100 transition-colors mr-3 flex-shrink-0">
                  <s.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="space-y-6 max-w-3xl mx-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === 'user' 
                    ? 'bg-gray-900 ml-3' 
                    : 'bg-gradient-to-br from-primary-500 to-secondary mr-3'
                }`}>
                  {msg.role === 'user' ? (
                    <span className="text-white text-xs font-bold">{user?.name?.charAt(0) || 'U'}</span>
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-gray-900 text-white rounded-tr-sm'
                    : 'bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tl-sm'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[85%] flex-row">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary mr-3">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-4 rounded-2xl text-sm bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tl-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white border-t border-gray-100 z-10">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto relative flex items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Ask anything or generate content..."
            className="w-full max-h-32 min-h-[56px] py-3.5 pl-4 pr-14 bg-gray-50 border border-gray-200 rounded-xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all overflow-y-auto"
            rows="1"
            style={{
              height: 'auto',
              minHeight: '56px',
            }}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 bottom-2 p-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center">
          <Sparkles className="w-3 h-3 mr-1" />
          AI can make mistakes. Consider verifying important information.
        </p>
      </div>

    </div>
  );
}
