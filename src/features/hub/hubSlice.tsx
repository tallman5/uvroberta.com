import { createSelector, createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../context"
const signalR = require("@microsoft/signalr")
import { HubConnection } from '@microsoft/signalr'
import { updateDrivers, updateGpsState, updateRoboteqState } from "../roberta/robertaSlice";
import { getAccessToken } from "../appUser/appUserSlice";
import { UiFunction, isBrowser } from "@tallman/strong-strap";
import { Message, addMessage, deleteMessage } from "../app/appSlice";

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
export const alertConnectionState = (connectionState: string): AppThunk => async (dispatch, getState) => {
    const messagePrefix = "Roberta Connection: ";

    const appMessages = getState().app.messageList;
    appMessages.forEach(message => {
        if (message.title?.startsWith(messagePrefix))
            dispatch(deleteMessage(message.id));
    });

    const msg: Message = {
        uiFunction: UiFunction.Success,
        displayTimeout: 3000,
        id: 0,
        title: messagePrefix + connectionState
    };

    switch (connectionState) {
        case 'Disconnected':
            msg.displayTimeout = 1000;
            msg.uiFunction = UiFunction.Danger;
            break;
        case 'Connecting':
            msg.displayTimeout = 1000;
            msg.uiFunction = UiFunction.Warning;
            break;
        case 'Connected':
            break;
        default:
            console.error(`Unknown state: ${connectionState}`);
            break;
    };

    dispatch(addMessage(msg));
    dispatch(setConnectionStatus(connectionState));
}

export const connectToHub = (accessToken: string): AppThunk => async (dispatch, getState) => {
    if (!isBrowser) return;

    const state = getState();

    hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(state.hub.hubUrl, { accessTokenFactory: () => accessToken })
        .withAutomaticReconnect()
        .build();

    // Connection events
    hubConnection.onreconnecting(() => { dispatch(alertConnectionState(hubConnection.state)); })
    hubConnection.onreconnected(() => { dispatch(alertConnectionState(hubConnection.state)); })
    hubConnection.onclose(() => { dispatch(alertConnectionState(hubConnection.state)); })

    // Hub Events
    hubConnection.on("DriversUpdated", drivers => { dispatch(updateDrivers(drivers)); });
    hubConnection.on("GpsStateUpdated", gpsState => { dispatch(updateGpsState(gpsState)); });
    hubConnection.on("RoboteqStateUpdated", roboteqState => { dispatch(updateRoboteqState(roboteqState)); });

    const returnValue = await hubConnection.start()
        .then(() => {
            dispatch(alertConnectionState(hubConnection.state));
            dispatch(setConnectionId(hubConnection.connectionId));
            return hubConnection;
        })
        .catch((err) => {
            console.error(err)
            dispatch(alertConnectionState(hubConnection.state));
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
    hubConnection?.stop();
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
