import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const exisitingProduct = state.find(item=>item.id==action.payload.id)
            if(exisitingProduct){
                const remaingProducts = state.filter(item=>item.id!=exisitingProduct.id)
                exisitingProduct.quantity++
                exisitingProduct.totalPrice = exisitingProduct.quantity*exisitingProduct.price
                state = [...remaingProducts,exisitingProduct]
            }else{
                state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
            }
        },
        removeCartItem:(state,action)=>{
            return state.filter(item=>item.id!=action.payload)
        },
        emptyCart:(state)=>{
           return state = []
        },
        incQuantity:(state,action)=>{
            const exisitingProduct = state.find(item=>item.id==action.payload.id)
            exisitingProduct.quantity++
            exisitingProduct.totalPrice = exisitingProduct.quantity*exisitingProduct.price
            const remaingProducts = state.filter(item=>item.id!=exisitingProduct.id)
            state = [...remaingProducts,exisitingProduct]
        },
        decQuantity:(state,action)=>{
            const exisitingProduct = state.find(item=>item.id==action.payload.id)
            exisitingProduct.quantity--
            exisitingProduct.totalPrice = exisitingProduct.quantity*exisitingProduct.price
            const remaingProducts = state.filter(item=>item.id!=exisitingProduct.id)
            state = [...remaingProducts,exisitingProduct]
        }
    }
})

export const {addToCart, removeCartItem, emptyCart,incQuantity, decQuantity} = cartSlice.actions
export default cartSlice.reducer