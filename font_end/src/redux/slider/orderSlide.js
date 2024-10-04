import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the order creation
const initialState = {
  orderItems:[],
  shippingAddress:{
    // fullName: { type: String, required: true },
    // address: {type: String, required: true},
    // city: {type: String, required: true},
    // country:{type: String, required: true},
    // phone:{type: Number, required: true},
  },
  paymentMethod:'',
  itemsPrice: 0,
  itemsDiscount: 0,
  shippingPrice: 0,
  texPrice: 0,
  totalPrice :0,
  user: '',
  isPaid: false,
  deliveredAt: '',
};

// Create a slice for order creation
const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Action to start order creation
    addOrderProduct(state,action) {
      const {orderItem} = action.payload
      const itemOrder = state?.orderItems?.find((item)=> item?.product === orderItem.product)
      if(itemOrder){
        itemOrder.amount += orderItem?.amount
      }else{
        state.orderItems.push(orderItem)
      }
    },
    increaseAmount: (state,action)=>{
      const {idProduct}= action.payload;
      const itemOrder = state?.orderItems?.find((item)=> item?.product === idProduct)
      itemOrder.amount ++ 
    },
    decreaseAmount: (state,action)=>{
      const {idProduct}= action.payload;
      const itemOrder = state?.orderItems?.find((item)=> item?.product === idProduct)
      itemOrder.amount -- 
    }
    ,
    removeOrderProduct(state,action) {
      const idProduct = action.payload
      console.log("idProduct",action.payload)
      const itemOrder = state?.orderItems?.filter((item)=> item?.product !== idProduct)
      state.orderItems = itemOrder
    }
  },
});

// Export the actions generated by createSlice
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct
} = orderSlide.actions;

// Export the reducer to be used in the store
export default orderSlide.reducer;