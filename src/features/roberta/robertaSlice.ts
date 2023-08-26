import { createSelector, createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../context"

export type DriverStatusType = {
    id: number
    name: string
    code: string
}

export enum DashView {
    Cam, Ground, Map
}

export type Driver = {
    connectionId: string
    driverStatusType: DriverStatusType
    screenName: string
    userName: string
    id: string
    title: string
}

export type GpsState = {
    heading: number
    isReady: boolean
    latitude: number
    longitude: number
    speed: number
}

const initialGpsState: GpsState = {
    heading: 0,
    isReady: false,
    latitude: 40.229057,
    longitude: -75.507144,
    speed: 0,
}

export type RobertaState = {
    dashView: number
    drivers: Driver[]
    gpsState: GpsState
}

const initialState: RobertaState = {
    dashView: 0,
    drivers: [],
    gpsState: initialGpsState,
}

export const robertaSlice = createSlice({
    name: 'roberta',
    initialState,
    reducers: {
        updateDashView: (state, action) => {
            return {
                ...state,
                dashView: action.payload
            }
        },
        updateDrivers: (state, action) => {
            return {
                ...state,
                drivers: action.payload
            }
        },
        updateGpsState: (state, action) => {
            return {
                ...state,
                gpsState: action.payload
            }
        }
    },
});

// Base selectors
export const selectNumber = (_: RootState, n: number) => n;
export const selectRobertaBase = (state: RootState) => state.roberta;
export const selectDriversBase = (state: RootState) => state.roberta.drivers;
export const selectDvBase = (state: RootState) => state.roberta.dashView;

// Reselectors
export const selectRoberta = createSelector(selectRobertaBase, item => item);
export const selectRobertaDrivers = createSelector(selectDriversBase, item => item);
export const selectRobertaDashView = createSelector(selectDvBase, item => item);

// Methods
export const cycleDashView = (): AppThunk => async (dispatch, getState) => {
    let nextVal = getState().roberta.dashView + 1;
    if (nextVal > 2) nextVal = 0;
    dispatch(updateDashView(nextVal));
};


export const { updateDashView, updateDrivers, updateGpsState } = robertaSlice.actions;
export default robertaSlice.reducer;
