import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortOption = 'none' | 'price-asc' | 'price-desc';

interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  sortBy: SortOption;
}

const initialState: FilterState = {
  searchQuery: '',
  selectedCategory: 'Tất cả',
  sortBy: 'none',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    resetFilter: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'Tất cả';
      state.sortBy = 'none';
    },
  },
});

export const { setSearchQuery, setSelectedCategory, setSortBy, resetFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
