import { createSlice } from "@reduxjs/toolkit";

// Initial State of the application
const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

/* Create Slice:
Dispatches action into data layer - 3 actions = set origin & destination & travel time 
We change state when action comes. Info inside action is called payload. 
As actions are passed in, Data Layer (state) will be updated
*/
export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },

    setDestination: (state, action) => {
      state.destination = action.payload;
    },

    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

//Selectors: Grab info from the DataLayer throughout application
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

// This gets exported to the store
export default navSlice.reducer;
