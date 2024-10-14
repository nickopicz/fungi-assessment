'use client';
import React, { useRef, useState } from 'react';
import ChatContainer from '@/components/ChatContainer';
import InputArea from '@/components/InputArea';
import { sendMessageToBackend } from '../functions/sendLLMReq';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/slices/loadingSlice';

interface Message {
	content: string;
	role: 'user' | 'ai';
}

const App: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputMessage, setInputMessage] = useState<string>('');
	// const [fullResponse, setFullResponse] = useState<string>('');
	const fullResponse = useRef('');
	const dispatch = useDispatch();

	// Function to handle AI message stream updates
	const handleStreamUpdate = (streamedContent: string) => {
		setMessages((prevMessages) => {
			// Check if the last message is from AI and append to it
			const lastMessage = prevMessages[prevMessages.length - 1];
			if (lastMessage && lastMessage.role === 'ai') {
				fullResponse.current = streamedContent;
				console.log('full response: ', fullResponse);
				// Append only new content from streamedContent
				const updatedMessages = [...prevMessages];
				updatedMessages[updatedMessages.length - 1] = {
					...lastMessage,
					content: fullResponse.current, // Append new chunk of content
				};
				return updatedMessages;
			} else {
				// If there's no AI message yet, create a new one
				return [...prevMessages, { content: streamedContent, role: 'ai' }];
			}
		});
	};

	// Function to send a message and handle AI response
	const sendMessage = async () => {
		if (!inputMessage.trim()) return;
		dispatch(setLoading(true));
		const userMessage: string = inputMessage;

		// Add user's message to the chat
		setMessages((prevMessages) => [
			...prevMessages,
			{ content: userMessage, role: 'user' },
		]);
		setInputMessage(''); // Clear the input field

		// Send message to backend and start streaming AI response
		try {
			await sendMessageToBackend(userMessage, handleStreamUpdate);
		} catch (error) {
			setMessages((prevMessages) => [
				...prevMessages,
				{ content: 'Error fetching response from AI', role: 'ai' },
			]);
		}
		dispatch(setLoading(false));
	};

	return (
		<div className="min-h-screen bg-gray-900 p-8 text-white flex justify-center items-center">
			<div className="max-w-2xl w-full bg-gray-800 p-10 shadow-2xl rounded-lg">
				<h1 className="text-4xl font-bold mb-6 text-center">DeFi AI Chatbot</h1>
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

export default App;
