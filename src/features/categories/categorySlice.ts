import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}

const category: Category = {
  id: "937ab54c-22cb-42ec-bd0d-5aac6ff37a55",
  name: "Coffee",
  description: "Coffee description",
  is_active: true,
  deleted_at: null,
  created_at: "2015-07-07T07:07:07+0000",
  updated_at: "2015-07-07T07:07:07+0000",
};

export const initialState = [
  category,
  {
    ...category,
    id: "937ab54c-22cb-42ec-bd0d-5aac6ff37a53",
    name: "Peach",
  },
  {
    ...category,
    id: "937ab54c-22cb-42ec-bd0d-5aac6ff37a52",
    name: "Test",
  },
  {
    ...category,
    id: "937ab54c-22cb-42ec-bd0d-5aac6ff37a54",
    name: "Case",
  },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory(state, action) {},
    updateCategory(state, action) {},
    deleteCategory(state, action) {},
  },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;
// export const selectCategoriesLoading = (state: RootState) => state.categories.categories.loading;

export default categoriesSlice.reducer;
