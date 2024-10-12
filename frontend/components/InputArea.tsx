import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LottiePlayer from './LottiePlayer';

interface InputAreaProps {
	inputMessage: string;
	setInputMessage: React.Dispatch<React.SetStateAction<string>>;
	sendMessage: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({
	inputMessage,
	setInputMessage,
	sendMessage,
}) => {
	const loading = useSelector((state) => state.loading.isLoading);

	useEffect(() => {
		console.log('loading val: ', loading);
	}, [loading]);

	return (
		<div className="flex justify-center items-center p-1">
			<input
				className="text-background p-1 rounded-lg"
				type="text"
				value={inputMessage}
				onChange={(e) => setInputMessage(e.target.value)}
				placeholder="Type your message..."
			/>
			{loading ? (
				<div className="ml-2">
					<LottiePlayer />
				</div>
			) : (
				<button
					onClick={sendMessage}
					className="ml-2 bg-accent text-background p-2 rounded-lg hover:bg-blue-600"
					style={{ width: '100px', height: '40px' }} // Match button size to the animation
				>
					Send
				</button>
			)}
		</div>
	);
};

export default InputArea;
