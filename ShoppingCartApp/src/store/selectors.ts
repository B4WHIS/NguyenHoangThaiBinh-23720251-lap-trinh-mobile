import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Product } from '../types';

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectFilter = (state: RootState) => state.filter;

export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);

export const selectIsFavorite = (productId: number) =>
  createSelector([selectFavorites], (favorites) =>
    favorites.some((item) => item.id === productId)
  );

export const selectFilteredProducts = (allProducts: Product[]) =>
  createSelector([selectFilter], ({ searchQuery, selectedCategory, sortBy }) => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = allProducts.filter((product) => {
      const matchCategory =
        selectedCategory === 'Tất cả' || product.category === selectedCategory;
      const matchSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });

    if (sortBy === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  });
