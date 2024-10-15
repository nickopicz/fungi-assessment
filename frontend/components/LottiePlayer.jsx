import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottiePlayer = () => {

	const animationContainer = useRef(null);

	//renders lottie animation on mounting
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
				width: '95px',
				height: '95px',
			}}
		/>
	);
};

export default LottiePlayer;
