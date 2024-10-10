import React from 'react';

interface MessageProps {
	content: string;
	role: 'user' | 'ai';
	className: string;
}

const Message: React.FC<MessageProps> = ({ content, role }) => {
	return (
		<div
			className={`p-2 my-2 rounded-lg ${
				role === 'user' ? 'bg-accent text-right' : 'bg-background'
			}`}
		>
			{content}
		</div>
	);
};

export default Message;
