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
	const fullResponse = useRef('');
	const dispatch = useDispatch();

	// Function to handle AI message stream updates
	const handleStreamUpdate = (streamedContent: string) => {
		setMessages((prevMessages) => {
			const lastMessage = prevMessages[prevMessages.length - 1];
			if (lastMessage && lastMessage.role === 'ai') {
				fullResponse.current = streamedContent;
				const updatedMessages = [...prevMessages];
				updatedMessages[updatedMessages.length - 1] = {
					...lastMessage,
					content: fullResponse.current,
				};
				return updatedMessages;
			} else {
				return [...prevMessages, { content: streamedContent, role: 'ai' }];
			}
		});
	};

	// Function to send a message and handle AI response
	const sendMessage = async () => {
		if (!inputMessage.trim()) return;
		dispatch(setLoading(true));
		const userMessage: string = inputMessage;

		setMessages((prevMessages) => [
			...prevMessages,
			{ content: userMessage, role: 'user' },
		]);
		setInputMessage('');

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
		<div className="w-screen h-screen flex flex-col bg-gray-900 text-white">
			<div className="flex-grow flex flex-col justify-between items-center w-full h-full">
				<div className="w-full h-full bg-gray-800 p-4 shadow-2xl rounded-lg flex flex-col">
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
