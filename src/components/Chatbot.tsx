"use client";

import { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ArrowPathIcon,
  WrenchIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid";
import { 
  UserIcon,
  ComputerDesktopIcon
} from "@heroicons/react/24/outline";

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Helper function to get friendly tool names
const getToolDisplayName = (toolName: string): string => {
  const toolNames: Record<string, string> = {
    'getProjects': 'Fetching projects',
    'getAchievements': 'Fetching achievements',
    'getExperience': 'Fetching experience',
    'getEducationInfo': 'Fetching education info',
    'getFiles': 'Fetching files',
    'getBlogPosts': 'Fetching blog posts',
    'getContactInfo': 'Fetching contact info',
    'analyzeURL': 'Analyzing URL'
  };
  return toolNames[toolName] || `Using ${toolName}`;
};

// Helper function to get tool icon
const getToolIcon = (state: string) => {
  switch (state) {
    case 'partial-call':
    case 'call':
      return <WrenchIcon className="h-4 w-4 text-blue-500 animate-spin" />;
    case 'result':
      return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
    default:
      return <WrenchIcon className="h-4 w-4 text-gray-500" />;
  }
};

export default function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    status,
    stop,
    reload,
    error
  } = useChat({
    api: '/api/chat',
    experimental_throttle: 50, // Throttle UI updates to 50ms for better performance
    onError: (err) => {
      console.error('Chat error (detailed):', {
        message: err.message,
        stack: err.stack,
        name: err.name,
        cause: err.cause
      });
      console.error('Raw error object:', err);
    },
    onFinish: (message) => {
      console.log('Message finished:', message);
    },
    onToolCall: ({ toolCall }) => {
      console.log('Tool call detected:', toolCall);
    }
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Add welcome message when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // This will be handled by the API route with a system message
    }
  }, [isOpen, messages.length]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white'
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 mx-auto" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6 mx-auto" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
              <Image
                src="/images/profile.jpg"
                alt="Dhairya Shah"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Dhairya Shah</h3>
              <p className="text-xs text-blue-100">AI Twin</p>
            </div>
            <div className="flex items-center gap-2">
              {error && (
                <button
                  onClick={() => reload()}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  title="Retry last message"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={onToggle}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 flex items-center justify-center">
                  <ComputerDesktopIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm">Hi! I&apos;m Dhairya&apos;s digital twin.</p>
                <p className="text-xs mt-1">Ask me anything about my projects, skills, or experience!</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id}>
                {/* Render the main message */}
                <div
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/profile.jpg"
                        alt="Dhairya"
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-p:leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            // Custom link component that opens in new tab
                            a: ({ href, children, ...props }) => {
                              return (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-1"
                                  {...props}
                                >
                                  {children}
                                  <span className="text-xs">↗</span>
                                </a>
                              );
                            },
                            // Custom paragraph component to control spacing
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                            ),
                            // Custom strong/bold component
                            strong: ({ children }) => {
                              return (
                                <strong className="font-semibold text-gray-900 dark:text-gray-100">
                                  {children}
                                </strong>
                              );
                            },
                            // Custom code component for inline code
                            code: ({ children }) => (
                              <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">
                                {children}
                              </code>
                            ),
                            // Custom list components
                            ul: ({ children }) => (
                              <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-sm">{children}</li>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <UserIcon className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Render tool calls as separate messages */}
                {message.parts && message.parts.map((part, partIndex) => {
                  if (part.type === 'tool-invocation') {
                    return (
                      <div key={`${message.id}-tool-${partIndex}`} className="flex gap-3 justify-start mt-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/images/profile.jpg"
                            alt="Dhairya"
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="max-w-[80%] rounded-lg px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center gap-2 text-sm">
                            {getToolIcon(part.toolInvocation.state)}
                            <span className="font-medium">
                              {getToolDisplayName(part.toolInvocation.toolName)}
                            </span>
                            {part.toolInvocation.state === 'call' && (
                              <span className="text-xs opacity-70">...</span>
                            )}
                          </div>
                          {part.toolInvocation.state === 'result' && part.toolInvocation.result && (
                            <div className="text-xs mt-1 opacity-70">
                              ✓ Complete
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}

            {(status === 'submitted' || status === 'streaming') && (
              <div className="flex gap-3 justify-start mt-4">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/profile.jpg"
                    alt="Dhairya"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 min-w-16">
                  {status === 'submitted' ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">Thinking...</div>
                  ) : (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-2 rounded-lg text-sm">
                  Something went wrong. Please try again.
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <form onSubmit={handleFormSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                disabled={status !== 'ready'}
              />
              <button
                type="submit"
                disabled={status !== 'ready' || !input.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {status === 'submitted' || status === 'streaming' ? (
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <PaperAirplaneIcon className="h-4 w-4" />
                )}
              </button>
              {(status === 'streaming' || status === 'submitted') && (
                <button
                  type="button"
                  onClick={stop}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Stop
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
