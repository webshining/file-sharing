import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types/user.type";

const defaultState: UserState = {
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: defaultState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<UserState>) => {
			state.user = action.payload.user;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
