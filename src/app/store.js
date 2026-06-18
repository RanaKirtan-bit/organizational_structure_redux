import {configureStore} from "@reduxjs/toolkit";
import orgTreeReducer from "../features/orgTreeSlice.js";

export const store = configureStore({
      reducer: {
            orgTree: orgTreeReducer,
      },
});

