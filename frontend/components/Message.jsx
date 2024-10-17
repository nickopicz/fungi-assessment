import Image from 'next/image';
import { useEffect } from 'react';

const Message = ({ content, role, className = '' }) => {
	// Check if content is a base64-encoded image
	const isBase64Image = content.startsWith('data:image/png;base64,');

	useEffect(() => {
		console.log('is image? ', isBase64Image);
	});

	return (
		<>
			<p
				className={`md:text-2xl text-sm mb-1
				${role === 'user'
						? 'text-right text-accent'
						: 'text-left text-white'
					}`}>
				{role === 'user' ? 'You' : 'Defi Bud'}
			</p>
			<div
				className={`p-3 my-2 rounded-lg inline-block ${role === 'user'
					? 'bg-accent text-right text-background self-end'
					: 'bg-background text-left text-gray-200 self-start'
					} ${className}`}
				style={{
					maxWidth: '75%',
					width: 'fit-content',
					wordBreak: 'break-word',
					alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
				}}
			>
				{isBase64Image ? (
					<Image
						src={content}
						alt="AI generated graph"
						width={600}
						height={500}
						className="max-w-full h-auto"
					/>
				) : (
					<p className="break-words text-lg md:text-xl">
						{content}
					</p>
				)}
			</div>
		</>
	);
};

export default Message;
