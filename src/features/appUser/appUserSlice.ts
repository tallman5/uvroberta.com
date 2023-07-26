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
    userToken: UserToken | null
}

const initialState: AppUserState = {
    userToken: null,
}

export const appUserSlice = createSlice({
    name: 'appUser',
    initialState: initialState,
    reducers: {
        clearToken: (state: AppUserState) => {
            state.userToken = null
        },
        setUserToken: (state: AppUserState, action) => {
            state.userToken = action.payload
        },
    },
});

// Base Selectors
export const selectAppUserBase = (state: RootState) => state.appUser;
export const selectTokenBase = (state: RootState) => state.appUser.userToken;

// Reselectors
export const selectAppUser = createSelector(selectAppUserBase, (val: AppUserState) => val);
export const selectAccessToken = createSelector(selectTokenBase, (at) => {
    return at?.accessToken;
});

// Methods
export const getAccessToken = createAsyncThunk<string, void, { state: RootState }>(
    'getAccessToken',
    async (_, thunkAPI) => {
        let ut = thunkAPI.getState().appUser.userToken;
        if (ut && ut.accessToken) // need to check expiration
            return ut.accessToken;
        ut = await executeFetchAsync(process.env.GATSBY_BASE_URL + '/api/user/guestToken');
        if (ut && ut.accessToken) {
            thunkAPI.dispatch(setUserToken(ut));
            return ut.accessToken;
        }
        throw 'Could not aquire guest token.'
    }
);

// Main slice exports
export const { clearToken, setUserToken } = appUserSlice.actions;
export default appUserSlice.reducer;
