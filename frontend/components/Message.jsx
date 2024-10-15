import Image from 'next/image';
import { useEffect } from 'react';

const Message = ({ content, role, className = '' }) => {
	// Check if content is a base64-encoded image
	const isBase64Image = content.startsWith('data:image/png;base64,'); // Adjust for your encoding

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
					maxWidth: '75%',          // Max width is 75% of the container
					width: 'fit-content',      // Width adjusts based on content
					wordBreak: 'break-word',   // Ensure long words wrap properly
					alignSelf: role === 'user' ? 'flex-end' : 'flex-start', // Align messages based on role
				}}
			>
				{isBase64Image ? (
					<Image
						src={content} // The base64-encoded image string
						alt="AI generated graph"
						width={600} // Provide a width
						height={500} // Provide a height
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
