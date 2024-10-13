import Image from 'next/image';

const Message: React.FC<MessageProps> = ({ content, role, className = '' }) => {
	// Check if content is an image URL
	const isImageUrl = content.startsWith('/static/images/'); // For image URL detection

	return (
		<div
			className={`p-2 my-2 rounded-lg ${
				role === 'user'
					? 'bg-accent text-right text-background'
					: 'bg-background text-gray-200'
			} ${className}`}
		>
			{isImageUrl ? (
				<Image
					src={content} // The image URL returned from the backend
					alt="AI generated graph"
					width={500} // Provide a width
					height={300} // Provide a height
					className="max-w-full h-auto"
				/>
			) : (
				<p>{content}</p>
			)}
		</div>
	);
};

export default Message;
