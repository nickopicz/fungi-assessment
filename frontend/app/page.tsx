'use client';
import React, { useState } from 'react';
import ChatContainer from '@/components/ChatContainer';
import InputArea from '@/components/InputArea';
import { sendMessageToBackend, MessageResponse } from '../functions/sendLLMReq';

interface Message {
	content: string;
	role: 'user' | 'ai';
}

const Home: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputMessage, setInputMessage] = useState<string>('');

	// Function to send a message and handle AI response
	const sendMessage = async () => {
		if (!inputMessage.trim()) return;

		const userMessage: string = inputMessage;
		setMessages((prevMessages) => [
			...prevMessages,
			{ content: userMessage, role: 'user' },
		]);
		setInputMessage(''); // Clear the input field

		// Send message to backend and get AI response
		try {
			const response = await sendMessageToBackend(userMessage);
			console.log('response in setting state: ', response);
			setMessages((prevMessages) => [
				...prevMessages,
				{ content: response, role: 'ai' },
			]);
		} catch (error) {
			setMessages((prevMessages) => [
				...prevMessages,
				{ content: 'Error fetching response from AI', role: 'ai' },
			]);
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 p-6 text-white">
			<div className="max-w-lg mx-auto bg-gray-800 p-6 shadow-lg rounded-lg">
				<h1 className="text-2xl font-bold mb-4">DeFi AI Chatbot</h1>
				<ChatContainer messages={messages} />
				<InputArea
					inputMessage={inputMessage}
					setInputMessage={setInputMessage}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	);
};

export default Home;
