'use client';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import App from './app';

//Root component for app, wrapped in a redux store
const Home: React.FC = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

export default Home;
