import React from 'react';

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
	return (
		<div className="flex justify-center p-1">
			<input
				className="text-background p-1 rounded-lg"
				type="text"
				value={inputMessage}
				onChange={(e) => setInputMessage(e.target.value)}
				placeholder="Type your message..."
			/>
			<button
				onClick={sendMessage}
				className="ml-2 bg-accent text-white p-2 rounded-lg hover:bg-blue-600"
			>
				Send
			</button>
		</div>
	);
};

export default InputArea;
