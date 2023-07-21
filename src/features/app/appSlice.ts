import { createSelector, createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../context"
const signalR = require("@microsoft/signalr")
import { HubConnection } from '@microsoft/signalr'
import { UiFunction } from "@tallman/strong-strap";

let hubConnection: HubConnection;
const hubUrl = 'http://192.168.1.14:5000/robertaHub';

export type Message = {
    uiFunction: UiFunction
    details?: string
    displayTimeout: number
    id: number
    title?: string
}

export type AppState = {
    connectionStatus: string
    messageList: Message[]
}

const initialState: AppState = {
    connectionStatus: 'Closed',
    messageList: [],
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addMessage: (state: AppState, action) => {
            let newId = Math.max(...state.messageList.map(o => o.id), 0)
            newId++
            action.payload.id = newId
            state.messageList.push(action.payload)
        },
        clearMessages: (state) => {
            state.messageList = [];
        },
        deleteMessage: (state: AppState, action) => {
            state.messageList = state.messageList.filter(message => action.payload !== message.id)
        },

        setConnectionStatus: (state: AppState, action) => {
            state.connectionStatus = action.payload;
        },
    },
});

// Base selectors
export const selectMessagesBase = (state: RootState) => state.app.messageList;
export const selectConnectionStatusBase = (state: RootState) => state.app.connectionStatus;

// Reselectors
export const selectMessages = createSelector(selectMessagesBase, (items) => items)
export const selectConnectionStatus = createSelector(selectConnectionStatusBase, (status) => status)

// Methods
export const connectToHub = (): AppThunk => async (dispatch, getState) => {
    if (hubConnection && hubConnection.state === "Connected")
        return hubConnection;

    const state = getState()
    const currentStatus = state.app.connectionStatus
    if (currentStatus !== 'Closed')
        return;

    dispatch(setConnectionStatus('Connecting'));

    hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

    // Connection events
    hubConnection.onreconnecting(() => { dispatch(setConnectionStatus(hubConnection.state)); })
    hubConnection.onreconnected(() => { dispatch(setConnectionStatus(hubConnection.state)); })
    hubConnection.onclose(() => { dispatch(setConnectionStatus(hubConnection.state)); })

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
    if (hubConnection && hubConnection.state === "Connected")
        hubConnection.stop()
    dispatch(setConnectionStatus("Closed"));
};

export const reconnectToHub = (): AppThunk => async (dispatch) => {
    dispatch(disconnectHub());
    dispatch(connectToHub());
};

export function getConnection() {
    return hubConnection
}

// Main Exports
export const { addMessage, clearMessages, deleteMessage,
    setConnectionStatus } = appSlice.actions;
export default appSlice.reducer;
