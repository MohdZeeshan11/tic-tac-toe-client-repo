import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		addUser: (state, action) => {
			const user = action.payload
			return {...user};
		},

	},
});


// this is for dispatch
export const { addUser } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;