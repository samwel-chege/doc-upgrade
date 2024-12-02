import { createSlice } from "@reduxjs/toolkit";
import * as actions from './sliceActions';

const initialState = {
 loading:false,
 documents: {}
}

const documentSlice = createSlice({
    name: "document",
    initialState,
    extraReducers : (builder)=> {
        builder.addCase(actions.fetchDocument.pending, (state)=>{
            state.loading =true
      })

      builder.addCase(actions.fetchDocument.fulfilled, (state, action)=>{
            state.loading = false;
            state.documents = action.payload
            state.message = "Documents fetched successfully"
            state.error = ""
      })

      builder.addCase(actions.fetchDocument.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
      })
    }
})

export default documentSlice.reducer;