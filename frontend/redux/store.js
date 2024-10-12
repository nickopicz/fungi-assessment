// store.js
import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './slices/loadingSlice';

const store = configureStore({
	reducer: {
		loading: loadingSlice, // Add your loading slice here
	},
});

export default store;
