import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Product } from '../types';
import { formatPrice } from './ProductCard';

interface FavoritesViewProps {
  favorites: Product[];
  onRemoveFavorite: (id: number) => void;
  onClearFavorites: () => void;
  onAddToCart: (product: Product) => void;
  onGoToShop: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onRemoveFavorite,
  onClearFavorites,
  onAddToCart,
  onGoToShop,
}) => {
  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>💔</Text>
        <Text style={styles.emptyTitle}>Chưa có sản phẩm yêu thích</Text>
        <Text style={styles.emptyText}>
          Nhấn biểu tượng trái tim ❤️ ở bất kỳ sản phẩm nào để lưu lại danh sách tại đây.
        </Text>
        <TouchableOpacity style={styles.shopButton} onPress={onGoToShop}>
          <Text style={styles.shopButtonText}>Khám phá sản phẩm ngay</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.summaryText}>
          Đã lưu <Text style={styles.boldText}>{favorites.length}</Text> sản phẩm yêu thích
        </Text>
        <TouchableOpacity onPress={onClearFavorites}>
          <Text style={styles.clearAllText}>Xóa tất cả</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.addCartBtn}
                  onPress={() => onAddToCart(item)}
                >
                  <Text style={styles.addCartText}>+ Thêm vào giỏ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => onRemoveFavorite(item.id)}
                >
                  <Text style={styles.removeText}>Bỏ thích</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  summaryText: {
    fontSize: 14,
    color: '#4b5563',
  },
  boldText: {
    fontWeight: '700',
    color: '#111827',
  },
  clearAllText: {
    fontSize: 13,
    color: '#ef4444',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  category: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2563eb',
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  addCartBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addCartText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  removeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  removeText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#f9fafb',
  },
  emptyEmoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  shopButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
