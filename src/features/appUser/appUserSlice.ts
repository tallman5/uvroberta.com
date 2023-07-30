import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../context';
import { executeFetchAsync } from '@tallman/strong-strap';

export type UserToken = {
    accessToken: string
    expires: Date
    roles: string[]
    screenName: string
    userName: string
}

export type AppUserState = {
    guestAccessToken: string | null
    userToken: UserToken | null
}

const initialState: AppUserState = {
    guestAccessToken: null,
    userToken: null,
}

export const appUserSlice = createSlice({
    name: 'appUser',
    initialState: initialState,
    reducers: {
        clearToken: (state: AppUserState) => {
            state.userToken = null
        },
        setGuestAccessToken: (state: AppUserState, action) => {
            state.guestAccessToken = action.payload
        },
        setUserToken: (state: AppUserState, action) => {
            state.userToken = action.payload
        },
    },
});

// Base Selectors
export const selectAppUserBase = (state: RootState) => state.appUser;
export const selectTokenBase = (state: RootState) => state.appUser.userToken;
export const selectUserNameBase = (state: RootState) => state.appUser.userToken?.userName;


// Reselectors
export const selectAppUser = createSelector(selectAppUserBase, (val: AppUserState) => val);
export const selectUserName = createSelector(selectUserNameBase, val => val);


// Methods
export const getAccessToken = createAsyncThunk<string, void, { state: RootState }>(
    'getAccessToken',
    async (_, thunkAPI) => {
        let appUser = thunkAPI.getState().appUser;

        if (appUser.userToken?.accessToken) // need to check expiration
            return appUser.userToken.accessToken;

        if (appUser.guestAccessToken)
            return appUser.guestAccessToken;

        const guestUt: UserToken = await executeFetchAsync(process.env.GATSBY_BASE_URL + '/api/user/guestToken');
        if (guestUt && guestUt.accessToken) {
            thunkAPI.dispatch(setGuestAccessToken(guestUt.accessToken));
            return guestUt.accessToken;
        }
        throw 'Could not aquire guest token.'
    }
);

// Main slice exports
export const { clearToken, setGuestAccessToken, setUserToken } = appUserSlice.actions;
export default appUserSlice.reducer;
