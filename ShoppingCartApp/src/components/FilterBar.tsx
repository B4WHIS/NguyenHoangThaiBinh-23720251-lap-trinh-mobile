import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CATEGORIES } from '../data/products';
import { SortOption } from '../store/filterSlice';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: SortOption;
  onToggleSort: () => void;
  onReset: () => void;
  hasFilterActive: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onToggleSort,
  onReset,
  hasFilterActive,
}) => {
  const getSortLabel = () => {
    switch (sortBy) {
      case 'price-asc':
        return 'Giá: Thấp → Cao ↑';
      case 'price-desc':
        return 'Giá: Cao → Thấp ↓';
      default:
        return 'Sắp xếp: Mặc định';
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="Tìm theo tên sản phẩm, danh mục..."
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholderTextColor="#9ca3af"
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => onSearchChange('')} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.sortButton, sortBy !== 'none' && styles.activeSortButton]}
          onPress={onToggleSort}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy !== 'none' && styles.activeSortButtonText,
            ]}
          >
            {getSortLabel()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Horizontal Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, isSelected && styles.activeCategoryChip]}
              onPress={() => onSelectCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}

        {hasFilterActive && (
          <TouchableOpacity style={styles.resetChip} onPress={onReset}>
            <Text style={styles.resetText}>Đặt lại ↺</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  searchRow: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  clearBtn: {
    padding: 4,
  },
  clearBtnText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sortButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  activeSortButton: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
  },
  activeSortButtonText: {
    color: '#2563eb',
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  activeCategoryChip: {
    backgroundColor: '#2563eb',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4b5563',
  },
  activeCategoryText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  resetChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#fee2e2',
  },
  resetText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#dc2626',
  },
});
