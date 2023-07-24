import { createSelector, createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../context"
const signalR = require("@microsoft/signalr")
import { HubConnection } from '@microsoft/signalr'
import { updateGpsState } from "../roberta/robertaSlice";

let hubConnection: HubConnection;
const hubUrl = process.env.GATSBY_HUB_URL;

export type HubState = {
    connectionStatus: string
}

const initialState: HubState = {
    connectionStatus: 'Disconnected',
}

export const hubSlice = createSlice({
    name: 'hub',
    initialState,
    reducers: {
        setConnectionStatus: (state: HubState, action) => {
            state.connectionStatus = action.payload;
        },
    },
});

// Base selectors
export const selectConnectionStatusBase = (state: RootState) => state.hub.connectionStatus;

// Reselectors
export const selectConnectionStatus = createSelector(selectConnectionStatusBase, (status) => status)

// Methods
export const connectToHub = (): AppThunk => async (dispatch, getState) => {
    if (hubConnection && (hubConnection.state === "Connected" || hubConnection.state === "Connecting"))
        return hubConnection;

    const state = getState()
    const currentStatus = state.hub.connectionStatus
    if (currentStatus !== 'Disconnected')
        return;

    hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

    // Connection events
    hubConnection.onreconnecting(() => { dispatch(setConnectionStatus(hubConnection.state)); })
    hubConnection.onreconnected(() => { dispatch(setConnectionStatus(hubConnection.state)); })
    hubConnection.onclose(() => { dispatch(setConnectionStatus(hubConnection.state)); })

    // Hub Events
    hubConnection.on("GpsStateUpdated", gpsState => { dispatch(updateGpsState(gpsState)); });

    const returnValue = await hubConnection.start()
        .then(() => {
            dispatch(setConnectionStatus(hubConnection.state));
            return hubConnection;
        })
        .catch((err) => {
            console.error(err)
            dispatch(setConnectionStatus(hubConnection.state));
            return null;
        });

    return returnValue;
};

export const disconnectHub = (): AppThunk => async (dispatch) => {
    if (hubConnection && hubConnection.state !== "Disconnected")
        hubConnection.stop()
};

export const reconnectToHub = (): AppThunk => async (dispatch) => {
    dispatch(disconnectHub());
    dispatch(connectToHub());
};

export function getConnection() {
    return hubConnection
}

// Main Exports
export const { setConnectionStatus } = hubSlice.actions;
export default hubSlice.reducer;
