'use client';

import { useState } from 'react';
import ChatContainer from '@/components/ChatContainer';
import InputArea from '@/components/InputArea';

// Define the type for message
interface Message {
	content: string;
	role: 'user' | 'ai';
}

//Single page website because of simplicity and lack of user requirements
//
export default function Home() {
	// Type state using the Message type
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputMessage, setInputMessage] = useState<string>('');

	// Handle sending messages
	const sendMessage = () => {
		if (!inputMessage.trim()) return;

		const userMessage: Message = { role: 'user', content: inputMessage };

		// Mocking AI response, to be replaced
		const aiResponse: Message = {
			role: 'ai',
			content: `AI: I will respond to "${inputMessage}"`,
		};

		// Update messages state with both user and AI messages
		setMessages((prevMessages) => [...prevMessages, userMessage, aiResponse]);

		setInputMessage(''); // Clear the input field
	};

	return (
		<div className="min-h-screen max-v-screen bg-background p-6 text-white">
			<div className="max-w-lg mx-auto bg-foreground p-6 shadow-lg rounded-lg">
				<h1 className="text-2xl mx-auto font-bold mb-4">DeFi AI Chatbot</h1>
				<ChatContainer messages={messages} />
				<InputArea
					inputMessage={inputMessage}
					setInputMessage={setInputMessage}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	);
}
