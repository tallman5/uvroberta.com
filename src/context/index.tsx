import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import React from "react";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from '../features/app/appSlice'


export const createStore = () => configureStore({
    reducer: {
        app: appReducer,
    },
})

export const wrapWithProvider = ({ element }: any) => {
    const store = createStore()
    return (
        <Provider store={store} >
            {element}
        </Provider>
    )
}

type ConfiguredStore = ReturnType<typeof createStore>
type StoreGetState = ConfiguredStore["getState"]
export type RootState = ReturnType<StoreGetState>
export type AppDispatch = ConfiguredStore["dispatch"]
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
