import { configureStore } from "@reduxjs/toolkit";
 import userReducer from './userSlice/UserSlice'
import productSlice from "./productSlice/ProductSlice";
const store = configureStore({
    reducer:{
        user: userReducer,
        product: productSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;