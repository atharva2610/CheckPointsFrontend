import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: []
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        removeMessage: (state, action) => {
            state.messages = state.messages.filter((message, index) => index !== action.payload);
        }
    }
})

export const { addMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer