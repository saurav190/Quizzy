import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action) =>{
            state.categories = action.payload;
        },
        addCategories: (state, action) =>{
            state.categories.push(action.payload);
        },
        updateCategories: (state, action) => {
            const index = state.categories.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        removeCategories: (state, action) => {
            const categoryId = action.payload;
            state.categories = state.categories.filter(category => category.id !== categoryId);
        },
    },

});

export const { setCategory, addCategories, updateCategories, removeCategories} = categorySlice.actions;

export default categorySlice.reducer;