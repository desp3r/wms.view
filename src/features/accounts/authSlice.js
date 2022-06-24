import {createSlice} from "@reduxjs/toolkit"


const initialState = { user: {} }
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            return {
                ...state,
                user: action.payload.data
            }
            //state.user = action.payload.data
        },
        logOut: (state, action) => {
            debugger;
            return initialState;
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user