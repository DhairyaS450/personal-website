"use client";

import { useChatbot } from '@/contexts/ChatbotContext';
import Chatbot from '@/components/Chatbot';

export default function ChatbotWrapper() {
  const { isOpen, toggle } = useChatbot();

  return <Chatbot isOpen={isOpen} onToggle={toggle} />;
}
