import { configureStore } from "@reduxjs/toolkit";
import slidesArrayReducer from "../features/slidesArray";

const store = configureStore({
    reducer: {
        slidesArray: slidesArrayReducer,
    }
})

export default store;