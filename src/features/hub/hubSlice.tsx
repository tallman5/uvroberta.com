import { createSelector, createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../context"
const signalR = require("@microsoft/signalr")
import { HubConnection } from '@microsoft/signalr'
import { updateDrivers, updateGpsState } from "../roberta/robertaSlice";
import { getAccessToken } from "../appUser/appUserSlice";
import { isBrowser } from "@tallman/strong-strap";

let hubConnection: HubConnection;

export type HubState = {
    connectionId: string
    connectionStatus: string
    hubUrl: string
}

const initialState: HubState = {
    connectionId: '',
    connectionStatus: 'Disconnected',
    hubUrl: process.env.GATSBY_BASE_URL + "/robertaHub"
}

export const hubSlice = createSlice({
    name: 'hub',
    initialState,
    reducers: {
        setConnectionId: (state: HubState, action) => {
            state.connectionId = action.payload;
        },
        setConnectionStatus: (state: HubState, action) => {
            state.connectionStatus = action.payload;
        },
    },
});

// Base selectors
export const selectConnectionStatusBase = (state: RootState) => state.hub.connectionStatus;

// Reselectors
export const selectConnectionStatus = createSelector(selectConnectionStatusBase, (val) => val);

// Methods
export const connectToHub = (accessToken: string): AppThunk => async (dispatch, getState) => {
    if (!isBrowser) return;

    const state = getState();

    hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(state.hub.hubUrl, { accessTokenFactory: () => accessToken })
        .withAutomaticReconnect()
        .build();

    // Connection events
    hubConnection.onreconnecting(() => { dispatch(setConnectionStatus(hubConnection.state)); })
    hubConnection.onreconnected(() => { dispatch(setConnectionStatus(hubConnection.state)); })
    hubConnection.onclose(() => { dispatch(setConnectionStatus(hubConnection.state)); })

    // Hub Events
    hubConnection.on("DriversUpdated", drivers => { dispatch(updateDrivers(drivers)); });
    hubConnection.on("GpsStateUpdated", gpsState => { dispatch(updateGpsState(gpsState)); });

    const returnValue = await hubConnection.start()
        .then(() => {
            dispatch(setConnectionStatus(hubConnection.state));
            dispatch(setConnectionId(hubConnection.connectionId));
            return hubConnection;
        })
        .catch((err) => {
            console.error(err)
            dispatch(setConnectionStatus(hubConnection.state));
            dispatch(setConnectionId(''));
            return null;
        });

    return returnValue;
};

export const ensureHubConnected = (): AppThunk => async (dispatch) => {
    if (!isBrowser) return;
    if (hubConnection && (hubConnection.state === "Connected" || hubConnection.state === "Connecting"))
        return;

    const gat = dispatch(getAccessToken());
    const accessToken: string = (await gat).payload as string;
    if (accessToken == '') return;
    dispatch(connectToHub(accessToken));
}

export function getConnection() {
    return hubConnection
}

export const reconnectToHub = (accessToken: string): AppThunk => async (dispatch) => {
    console.log('Reconnecting...');
    hubConnection.stop();
    dispatch(setConnectionId(''));
    dispatch(connectToHub(accessToken));
};

export const setXY = (x: number, y: number): AppThunk => async () => {
    hubConnection.invoke("SetXY", x, y).catch((err) => {
        console.error(err.toString());
    });
}

export const startDriving = (connectionId: string): AppThunk => async () => {
    hubConnection.invoke("StartDriving", connectionId).catch(function (err) {
        console.error(err.toString());
    });
}

export const stopDriving = (): AppThunk => async () => {
    hubConnection.invoke("StopDriving").catch((err) => {
        console.error(err.toString());
    });
}

// Main Exports
export const { setConnectionId, setConnectionStatus } = hubSlice.actions;
export default hubSlice.reducer;
