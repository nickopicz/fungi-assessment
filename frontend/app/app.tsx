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
	const [messages, setMessages] = useState<Message[]>([
		{
			content: 'Hello, I am your friendly DeFi assistant! How can I help you?',
			role: 'ai',
		},
	]);
	const [inputMessage, setInputMessage] = useState<string>('');

	//mutable variable for every new message
	const fullResponse = useRef('');

	const dispatch = useDispatch();

	// Function to handle AI message stream updates
	const handleStreamUpdate = (streamedContent: string) => {
		//setMessages state setting arrow function
		setMessages((prevMessages) => {
			// Get the last message from the previous messages array
			const lastMessage = prevMessages[prevMessages.length - 1];

			// Check if the last message exists and if it's from the 'ai' role
			if (lastMessage && lastMessage.role === 'ai') {
				// Update the fullResponse ref with the latest streamed content
				fullResponse.current = streamedContent;

				// Create a copy of the previous messages to avoid mutating the state directly
				const updatedMessages = [...prevMessages];

				// Update the content of the last message in the copied messages array
				// We keep all properties of the last message, but update its content with the full streamed response
				updatedMessages[updatedMessages.length - 1] = {
					...lastMessage,
					content: fullResponse.current,
				};

				// Return the updated messages array to update the state
				return updatedMessages;
			} else {
				// If there is no 'ai' message or it's the first 'ai' message in this interaction,
				// add a new message with the streamed content and 'ai' role
				return [...prevMessages, { content: streamedContent, role: 'ai' }];
			}
		});
	};

	// Function to send a message and handle AI response
	const sendMessage = async () => {
		// If the input is empty or just whitespace, exit the function
		if (!inputMessage.trim()) return;

		// Dispatch a Redux action to set a loading state (UI can show a loading indicator)
		dispatch(setLoading(true));

		// Store the user's message in a variable
		const userMessage: string = inputMessage;

		// Add the user's message to the chat (with 'user' role) and update the messages state
		setMessages((prevMessages) => [
			...prevMessages, // Keep previous messages
			{ content: userMessage, role: 'user' }, // Add the new user message
		]);

		// Clear the input field after sending the message
		setInputMessage('');

		try {
			// Send the user's message to the backend, and handle the AI's streamed response
			await sendMessageToBackend(userMessage, handleStreamUpdate);
		} catch (error) {
			// If there's an error with the backend request, add an error message to the chat from the 'ai'
			setMessages((prevMessages) => [
				...prevMessages,
				{
					content: 'Sorry, we were unable to process your request', // Error message content
					role: 'ai', // Mark it as a message from the AI
				},
			]);
		}

		// After the message has been sent and handled, stop the loading indicator
		dispatch(setLoading(false));
	};

	return (
		<div className="w-screen h-screen flex flex-col bg-gray-900 text-white">
			<div className="flex-grow flex flex-col justify-between items-center w-full h-full">
				<div className="w-full h-full bg-background p-4 shadow-2xl rounded-lg flex flex-col">
					<h1 className="text-4xl font-bold mb-4 text-center">
						DeFi AI Chatbot
					</h1>
					<div className="flex-grow overflow-y-auto">
						<ChatContainer messages={messages} />
					</div>
					<div className="mt-4">
						<InputArea
							inputMessage={inputMessage}
							setInputMessage={setInputMessage}
							sendMessage={sendMessage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
