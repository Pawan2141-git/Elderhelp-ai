import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { isDark } = useTheme();

  // Predefined responses for ElderHelp
  const responses = {
    'help': 'To request help, click the "Get Help Now" button on the home page. Fill out the form with your details and our volunteers will contact you within 30 minutes.',
    'medicine': 'For medicine delivery, go to the Medicine Form page. Provide your prescription details and we\'ll deliver your medicines safely to your doorstep within 24 hours.',
    'volunteer': 'To become a volunteer, click "Become Volunteer" on the home page. Fill out the application form with your experience and availability. We\'ll contact you within 24 hours.',
    'emergency': 'For emergencies, please call our 24/7 helpline: +91-XXXXXXXXXX. For immediate assistance, you can also use the "Get Help Now" form.',
    'cost': 'All our services are completely FREE! We believe in helping elderly people without any cost. Our volunteers provide services out of compassion.',
    'time': 'Our volunteers are available 24/7 for emergencies. For regular requests, we respond within 30 minutes during business hours.',
    'location': 'We provide services across major cities in India. Our volunteers are available in Delhi, Mumbai, Bangalore, Chennai, and other major cities.',
    'safety': 'All our volunteers are background-checked and trained for elderly care. Your safety and comfort are our top priorities.',
    'contact': 'You can contact us through our website forms or call our helpline: +91-XXXXXXXXXX. We\'re here to help 24/7.',
    'services': 'We offer three main services: 1) Help Requests for daily tasks and companionship, 2) Medicine Delivery with prescription management, 3) Volunteer Network for community support.'
  };

  // Keywords for matching user queries
  const keywords = {
    'help': ['help', 'assistance', 'support', 'request', 'need help', 'क्या मदद कर सकते हैं'],
    'medicine': ['medicine', 'medication', 'prescription', 'delivery', 'drug', 'pill', 'दवा', 'मेडिसिन'],
    'volunteer': ['volunteer', 'join', 'become', 'apply', 'work', 'help others', 'स्वयंसेवक'],
    'emergency': ['emergency', 'urgent', 'immediate', 'critical', 'emergency', 'आपातकाल'],
    'cost': ['cost', 'price', 'money', 'free', 'charge', 'payment', 'पैसा', 'कीमत'],
    'time': ['time', 'when', 'duration', 'how long', 'समय', 'कब'],
    'location': ['location', 'area', 'city', 'place', 'where', 'जगह', 'शहर'],
    'safety': ['safe', 'security', 'trust', 'reliable', 'सुरक्षित', 'भरोसेमंद'],
    'contact': ['contact', 'call', 'phone', 'number', 'संपर्क', 'फोन'],
    'services': ['services', 'what do you do', 'offer', 'provide', 'सेवाएं', 'क्या करते हैं']
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [key, keywordList] of Object.entries(keywords)) {
      for (const keyword of keywordList) {
        if (lowerMessage.includes(keyword)) {
          return responses[key];
        }
      }
    }

    // Default response if no match found
    return "I'm here to help with ElderHelp services! You can ask me about help requests, medicine delivery, volunteering, or any other questions. How can I assist you today?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    setMessages(prev => [...prev, { text: userMessage, sender: 'user', time: new Date() }]);
    
    // Simulate typing
    setIsTyping(true);
    
    // Get bot response
    setTimeout(() => {
      const botResponse = getResponse(userMessage);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot', time: new Date() }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const welcomeMessage = "Hello! I'm your ElderHelp assistant. I can help you with:\n\n• Help requests and assistance\n• Medicine delivery services\n• Volunteer applications\n• Emergency contacts\n• General information\n\nHow can I help you today?";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: welcomeMessage, sender: 'bot', time: new Date() }]);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 0 }}
              animate={{ rotate: 180 }}
              exit={{ rotate: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 180 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed bottom-24 right-6 z-40 w-80 h-96 rounded-2xl shadow-2xl border backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-900/95 border-gray-700' 
                : 'bg-white/95 border-gray-200'
            }`}
          >
            {/* Chat Header */}
            <div className={`flex items-center justify-between p-4 border-b ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  isDark ? 'bg-blue-600' : 'bg-blue-500'
                }`}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    ElderHelp Assistant
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Online • 24/7 Available
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto h-64">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`p-2 rounded-full ${
                        message.sender === 'user' 
                          ? (isDark ? 'bg-blue-600' : 'bg-blue-500')
                          : (isDark ? 'bg-gray-700' : 'bg-gray-200')
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? (isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                          : (isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900')
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-blue-100' 
                            : (isDark ? 'text-gray-400' : 'text-gray-500')
                        }`}>
                          {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`p-2 rounded-full ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        isDark ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500/50 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500/50 focus:border-blue-500'
                  }`}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    inputValue.trim() 
                      ? (isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400')
                      : (isDark ? 'bg-gray-700' : 'bg-gray-200')
                  }`}
                  whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 