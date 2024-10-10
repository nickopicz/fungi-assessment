import React, { useEffect, useRef } from 'react';
import Message from '@/components/Message';

interface ChatContainerProps {
	messages: { content: string; role: 'user' | 'ai' }[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
	const chatRef = useRef<HTMLDivElement>(null);

	// Scroll to the bottom when a new message is added
	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div
			ref={chatRef}
			className="h-64 overflow-y-scroll bg-background p-4 rounded-lg mb-4"
		>
			{messages.map((message, index) => (
				<Message
					key={index}
					content={message.content}
					role={message.role}
					className={index === messages.length - 1 ? 'animate-bounce' : ''}
				/>
			))}
		</div>
	);
};

export default ChatContainer;
