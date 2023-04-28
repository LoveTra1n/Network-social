import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const findAllUser = createAsyncThunk(
    'findUser/findAllUser',
    async (filter,{rejectWithValue}) => {
        try {

            const res = await axios(`http://localhost:4444/users?not=${filter.login}&search=${filter.search}`)


            if(res.statusText !== "OK"){
                throw new Error('Не удалось найти')
            }

            return res.data

        }catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

const findUserSlice = createSlice({
    name: "findUser",
    initialState: {
        data: [],
        status: '',
        error: '',
        filter: {
            search: ''
        }
    },
    reducers: {
        changeSearch: (state, action) => {
            state.filter = {
                ...state.filter,
                search: action.payload
            }
        }
    },
    extraReducers: {
        [findAllUser.pending] : (state) => {
            state.status = "...Loading"
            state.error = ''
        },
        [findAllUser.rejected] : (state, action) => {
            state.status = 'Error'
            state.error = action.payload
        },
        [findAllUser.fulfilled] : (state,action) => {
            state.status = "OK"
            state.data = action.payload
        }
     }
})

export const {changeSearch} = findUserSlice.actions
export default findUserSlice.reducer