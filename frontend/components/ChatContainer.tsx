import React, { useEffect, useRef } from 'react';
import Message from './Message';

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
			className="h-full max-h-[calc(100vh-200px)] overflow-y-auto bg-background p-4 mb-4 flex flex-col gap-4"
		>
			{messages.map((message, index) => (
				<Message
					key={index}
					content={message.content}
					role={message.role}
					className={
						message.role === 'user'
							? 'bg-accent ml-auto w-3/4 text-right'
							: 'bg-foreground mr-auto w-3/4 text-left'
					}
				/>
			))}
		</div>
	);
};

export default ChatContainer;
