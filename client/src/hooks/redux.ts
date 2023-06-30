import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../storage";
import { storeActions } from "./../storage/index";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => {
	const dispatch = useAppDispatch();
	return bindActionCreators({ ...storeActions }, dispatch);
};
