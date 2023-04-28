import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    user: {
        login: ''
    }
}

const user = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        fillUser: (state, action) => {
            state.user = action.payload
        },
        logOut: (state, action) => {
            state.user = {login: ''}
        }
    }
 })

export const {fillUser,logOut} = user.actions
export default user.reducer