import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts',async()=>{
    const response = await axios.get("https://dummyjson.com/products")
    sessionStorage.setItem("allProducts",JSON.stringify(response.data.products))
    return response.data.products
})

const productSlice = createSlice({
    name:'products',
    initialState:{
        allProducts:[],
        allProductsDummy:[],
        loading:false,
        error:"",
        productsPerPage:10,
        currentPage:1
    },
    reducers:{
        searchByProduct :(state,action)=>{
           state.allProducts =  state.allProductsDummy.filter(item=>item.title.toLowerCase().includes(action.payload))
        },
        navigateToNextPage:(state)=>{
            state.currentPage++
        },
        navigateToPrevPage:(state)=>{
            state.currentPage--
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.allProducts = action.payload
            state.allProductsDummy = action.payload
        })
        builder.addCase(fetchProducts.rejected,(state)=>{
            state.loading = false
            state.allProducts = []
            state.error = "API Call failed.. Please try after some time!!!"
        })
    }
})

export const {searchByProduct,navigateToNextPage,navigateToPrevPage} = productSlice.actions
export default productSlice.reducer