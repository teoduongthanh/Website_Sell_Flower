import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    value:0,
    search:""
}
export const productSlide = createSlice({
    name:'product',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value += 1
        },
        
        decrement:(state)=>{
            state.value -= 1
        },
        increamentByAmount: (state,action)=>{
            state.value += action.payload
        },
        searchProduct:(state, action)=>{
            state.search = action.payload
        }
    },
})

export const {increamentByAmount, increment, decrement, searchProduct} = productSlide.actions

export default productSlide.reducer