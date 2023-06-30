import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userActions } from "./reducers/user.slice";

const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

export const storeActions = { ...userActions };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
