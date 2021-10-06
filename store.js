import { configureStore } from "@reduxjs/toolkit"; // Helps Setup DayaLayer
import navReducer from "./slices/navSlice"; 

//Reducer sets up store (global layer) when we connect it to navSlice object

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
