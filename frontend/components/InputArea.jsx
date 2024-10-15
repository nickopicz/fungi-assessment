import React from 'react';
import { useSelector } from 'react-redux';
import LottiePlayer from './LottiePlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const InputArea = ({
	inputMessage,
	setInputMessage,
	sendMessage,
}) => {

	const loading = useSelector((state) => state.loading.isLoading);

	return (
		<div className="flex justify-center items-center p-2 px-10">
			<textarea
				className="text-white md:text-xl  p-2 rounded-lg w-full resize-none bg-foreground"
				rows={3}
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
					className="ml-2 bg-accent text-background p-2 rounded-lg hover:bg-foreground flex justify-center items-center"
					style={{ width: '95px', height: '95px' }} // Adjust button size to fit the icon
				>
					<FontAwesomeIcon
						icon={faArrowUp}
						className="text-background"
						style={{ width: "40px", height: "40px" }}
					/>
				</button>
			)}
		</div>
	);
};

export default InputArea;
