const assert = {
  strictEqual<T>(actual: T, expected: T, message: string) {
    if (actual !== expected) {
      throw new Error(`Assertion failed: ${message}. Expected: ${expected}, Actual: ${actual}`);
    }
  },
};
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from './cartSlice';
import favoritesReducer, { toggleFavorite } from './favoritesSlice';
import filterReducer, {
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
} from './filterSlice';
import {
  selectCartItemCount,
  selectCartTotalPrice,
  selectFavoritesCount,
  selectFilteredProducts,
} from './selectors';
import { Product } from '../types';

const testProducts: Product[] = [
  { id: 1, name: 'iPhone 15', price: 2000, category: 'Điện thoại', image: '', rating: 5 },
  { id: 2, name: 'MacBook Air', price: 3000, category: 'Laptop', image: '', rating: 5 },
];

export function runStoreSelfCheck() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      favorites: favoritesReducer,
      filter: filterReducer,
    },
  });

  // 1. Cart check
  store.dispatch(addToCart(testProducts[0]));
  store.dispatch(addToCart(testProducts[0])); // quantity = 2
  store.dispatch(addToCart(testProducts[1])); // quantity = 1

  let state = store.getState();
  assert.strictEqual(selectCartItemCount(state), 3, 'Cart count should be 3');
  assert.strictEqual(
    selectCartTotalPrice(state),
    2000 * 2 + 3000,
    'Cart total should be 7000'
  );

  store.dispatch(decreaseQuantity(1)); // quantity 2 -> 1
  state = store.getState();
  assert.strictEqual(selectCartItemCount(state), 2, 'Cart count after decrease should be 2');

  store.dispatch(decreaseQuantity(1)); // quantity 1 -> removed
  state = store.getState();
  assert.strictEqual(selectCartItemCount(state), 1, 'Cart count after removing item 1 should be 1');

  // 2. Favorites check
  store.dispatch(toggleFavorite(testProducts[0])); // add
  state = store.getState();
  assert.strictEqual(selectFavoritesCount(state), 1, 'Favorites should have 1 item');

  store.dispatch(toggleFavorite(testProducts[0])); // remove
  state = store.getState();
  assert.strictEqual(selectFavoritesCount(state), 0, 'Favorites should be empty');

  // 3. Filter and search check
  store.dispatch(setSearchQuery('iphone'));
  state = store.getState();
  const searchResult = selectFilteredProducts(testProducts)(state);
  assert.strictEqual(searchResult.length, 1, 'Should find 1 item with query iphone');
  assert.strictEqual(searchResult[0].id, 1, 'Search result id should be 1');

  store.dispatch(setSearchQuery(''));
  store.dispatch(setSelectedCategory('Laptop'));
  store.dispatch(setSortBy('price-desc'));
  state = store.getState();
  const categoryResult = selectFilteredProducts(testProducts)(state);
  assert.strictEqual(categoryResult.length, 1, 'Should find 1 Laptop');
  assert.strictEqual(categoryResult[0].name, 'MacBook Air', 'Laptop name should be MacBook Air');

  return 'OK: All Redux Toolkit self-checks passed!';
}
