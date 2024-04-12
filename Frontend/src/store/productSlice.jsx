import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'


const STATUSES = Object.freeze({
    SUCCESS:"success",
    ERROR:"error",
    LOADING:"loading"
})
const productSlice = createSlice({
    name:'product',
    initialState:{
        data:[],
        status: STATUSES.SUCCESS
    },
    reducers:{
        setProducts(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        }
    }
})
export const {setProducts,setStatus} = productSlice.actions
export default productSlice.reducer

export function fetchProducts(){
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await axios.get('http://localhost:4000/api/products');
            dispatch(setProducts(response.data.products));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}