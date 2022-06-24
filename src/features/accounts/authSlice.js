import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: {} },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.data
        },
        logOut: (state, action) => {
            state.user = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user