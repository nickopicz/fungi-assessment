import Image from 'next/image';
import { useEffect } from 'react';

const Message = ({ content, role, className = '' }) => {
	// Check if content is a base64-encoded image
	const isBase64Image = content.startsWith('data:image/png;base64,'); // Adjust for your encoding
	useEffect(() => {
		console.log('is image? ', isBase64Image);
	});

	return (
		<div
			className={`p-2 my-2 rounded-lg ${role === 'user'
				? 'bg-accent text-right text-background'
				: 'bg-background text-gray-200'
				} ${className}`}
		>
			{isBase64Image ? (
				<Image
					src={content} // The base64-encoded image string
					alt="AI generated graph"
					width={500} // Provide a width
					height={300} // Provide a height
					className="max-w-full h-auto"
				/>
			) : (
				<p className="break-words">{content}</p>
			)}
		</div>
	);
};

export default Message;
