import React from 'react';

interface MessageProps {
	content: string;
	role: 'user' | 'ai';
	className?: string;
}

const Message: React.FC<MessageProps> = ({ content, role, className = '' }) => {
	return (
		<div
			className={`p-2 my-2 rounded-lg ${
				role === 'user'
					? 'bg-accent text-right text-background'
					: 'bg-background text-gray-200'
			} ${className}`}
		>
			{content}
		</div>
	);
};

export default Message;
