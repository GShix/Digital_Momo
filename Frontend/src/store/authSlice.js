import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { STATUSES } from '../globals/misc/Statuses';

const authSlice = createSlice({
    name:'product',
    initialState:{
        data:[],
        status: STATUSES.SUCCESS
    },
    reducers:{
        setUser(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        }
    }
})
export const {setUser,setStatus} = authSlice.actions
export default authSlice.reducer


export function registerUser(data){
    return async function loginUserThunk(dispatch,getState){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await  axios.post("http://localhost:40t00/api/auth/registerr",data);
            dispatch(setUser(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
