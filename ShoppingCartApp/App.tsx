import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './src/store';
import { Header, TabType } from './src/components/Header';
import { FilterBar } from './src/components/FilterBar';
import { ProductCard } from './src/components/ProductCard';
import { FavoritesView } from './src/components/FavoritesView';
import { CartView } from './src/components/CartView';
import { INITIAL_PRODUCTS } from './src/data/products';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from './src/store/cartSlice';
import {
  toggleFavorite,
  removeFavorite,
  clearFavorites,
} from './src/store/favoritesSlice';
import {
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  resetFilter,
} from './src/store/filterSlice';
import {
  selectCartItems,
  selectCartItemCount,
  selectCartTotalPrice,
  selectFavorites,
  selectFavoritesCount,
  selectFilter,
  selectFilteredProducts,
} from './src/store/selectors';
import { runStoreSelfCheck } from './src/store/selfCheck';

function ShoppingAppContent() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<TabType>('products');

  // Selectors
  const cartItems = useAppSelector(selectCartItems);
  const cartCount = useAppSelector(selectCartItemCount);
  const cartTotalPrice = useAppSelector(selectCartTotalPrice);

  const favorites = useAppSelector(selectFavorites);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const filter = useAppSelector(selectFilter);
  const filteredProducts = useAppSelector(
    useMemo(() => selectFilteredProducts(INITIAL_PRODUCTS), [])
  );

  useEffect(() => {
    try {
      const checkResult = runStoreSelfCheck();
      console.log('✅ Self-Check Result:', checkResult);
    } catch (err) {
      console.error('❌ Redux Self-Check Failed:', err);
    }
  }, []);

  const favoriteIdSet = useMemo(() => {
    return new Set(favorites.map((f) => f.id));
  }, [favorites]);

  const handleToggleSort = () => {
    if (filter.sortBy === 'none') {
      dispatch(setSortBy('price-asc'));
    } else if (filter.sortBy === 'price-asc') {
      dispatch(setSortBy('price-desc'));
    } else {
      dispatch(setSortBy('none'));
    }
  };

  const hasFilterActive =
    filter.searchQuery.trim().length > 0 ||
    filter.selectedCategory !== 'Tất cả' ||
    filter.sortBy !== 'none';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        favoritesCount={favoritesCount}
        cartCount={cartCount}
      />

      {activeTab === 'products' && (
        <View style={styles.content}>
          <FilterBar
            searchQuery={filter.searchQuery}
            onSearchChange={(text) => dispatch(setSearchQuery(text))}
            selectedCategory={filter.selectedCategory}
            onSelectCategory={(cat) => dispatch(setSelectedCategory(cat))}
            sortBy={filter.sortBy}
            onToggleSort={handleToggleSort}
            onReset={() => dispatch(resetFilter())}
            hasFilterActive={hasFilterActive}
          />

          {filteredProducts.length === 0 ? (
            <View style={styles.emptySearch}>
              <Text style={styles.emptySearchEmoji}>🔍</Text>
              <Text style={styles.emptySearchTitle}>Không tìm thấy sản phẩm nào</Text>
              <Text style={styles.emptySearchText}>
                Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.
              </Text>
              <TouchableOpacity
                style={styles.resetSearchBtn}
                onPress={() => dispatch(resetFilter())}
              >
                <Text style={styles.resetSearchBtnText}>Xóa bộ lọc</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={filteredProducts}
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.productList}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  isFavorite={favoriteIdSet.has(item.id)}
                  onToggleFavorite={(p) => dispatch(toggleFavorite(p))}
                  onAddToCart={(p) => dispatch(addToCart(p))}
                />
              )}
            />
          )}
        </View>
      )}

      {activeTab === 'favorites' && (
        <FavoritesView
          favorites={favorites}
          onRemoveFavorite={(id) => dispatch(removeFavorite(id))}
          onClearFavorites={() => dispatch(clearFavorites())}
          onAddToCart={(p) => dispatch(addToCart(p))}
          onGoToShop={() => setActiveTab('products')}
        />
      )}

      {activeTab === 'cart' && (
        <CartView
          cartItems={cartItems}
          totalCount={cartCount}
          totalPrice={cartTotalPrice}
          onIncreaseQuantity={(id) => dispatch(increaseQuantity(id))}
          onDecreaseQuantity={(id) => dispatch(decreaseQuantity(id))}
          onRemoveItem={(id) => dispatch(removeFromCart(id))}
          onClearCart={() => dispatch(clearCart())}
          onGoToShop={() => setActiveTab('products')}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ShoppingAppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  productList: {
    padding: 8,
    paddingBottom: 24,
  },
  emptySearch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptySearchEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptySearchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
  },
  emptySearchText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  resetSearchBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetSearchBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
