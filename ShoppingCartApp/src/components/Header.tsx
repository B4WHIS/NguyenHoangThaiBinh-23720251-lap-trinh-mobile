import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type TabType = 'products' | 'favorites' | 'cart';

interface HeaderProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  favoritesCount: number;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount,
  cartCount,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>ShopTech 📱</Text>
        <Text style={styles.subtitle}>Redux Toolkit Demo</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'products' && styles.activeTabButton]}
          onPress={() => onSelectTab('products')}
        >
          <Text
            style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}
          >
            Sản phẩm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'favorites' && styles.activeTabButton]}
          onPress={() => onSelectTab('favorites')}
        >
          <Text
            style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}
          >
            Yêu thích ❤️
          </Text>
          {favoritesCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favoritesCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'cart' && styles.activeTabButton]}
          onPress={() => onSelectTab('cart')}
        >
          <Text
            style={[styles.tabText, activeTab === 'cart' && styles.activeTabText]}
          >
            Giỏ hàng 🛒
          </Text>
          {cartCount > 0 && (
            <View style={[styles.badge, styles.cartBadge]}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4b5563',
  },
  activeTabText: {
    color: '#ffffff',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadge: {
    backgroundColor: '#f97316',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
});
