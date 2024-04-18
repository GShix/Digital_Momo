import { createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../globals/misc/Statuses';
import API from '../http';

const productSlice = createSlice({
    name:'product',
    initialState:{
        data:[],
        status: STATUSES.SUCCESS,
        selectedProduct:{}
    },
    reducers:{
        setProducts(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setselectedProduct(state,action){
            state.selectedProduct = action.payload
        }
        
    }
})
export const {setProducts,setStatus} = productSlice.actions
export default productSlice.reducer

export function fetchProducts(){
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get('/products');
            dispatch(setProducts(response.data.products));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}
export function fetchProductDetails(productId){
    return async function fetchProductDetailsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await API.get("/products/+productId");
            console.log(response)
            dispatch(setselectedProduct(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}