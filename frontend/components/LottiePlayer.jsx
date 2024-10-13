import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottiePlayer = () => {

	const animationContainer = useRef(null);

	useEffect(() => {
		const instance = lottie.loadAnimation({
			container: animationContainer.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: "/loading.json",

		});
		console.log("animation rendered")

		return () => instance.destroy()
	}, []);

	return (
		<div
			ref={animationContainer}
			style={{
				width: '50px', // Adjust the width to match the button size
				height: '50px', // Adjust the height to match the button size
			}}
		/>
	);
};

export default LottiePlayer;
