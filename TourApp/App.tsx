import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Tour, groupByCity, formatDate } from './utils/tour';
import { INITIAL_TOURS } from './data';
import TourItem from './components/TourItem';

// Đường dẫn API MockAPI phục vụ GET và PUT
const API_URL = 'https://6ace1c08f338359cf1c31d6f.mockapi.io/tours';

export default function App() {
  // Quản lý danh sách tour lấy từ máy chủ
  const [tours, setTours] = useState<Tour[]>([]);
  // Trạng thái đang tải dữ liệu lần đầu (hiển thị ActivityIndicator)
  const [loading, setLoading] = useState<boolean>(true);
  // Trạng thái đang kéo xuống làm mới (RefreshControl)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // Từ khóa tìm kiếm nhập từ ô TextInput (Câu 1c)
  const [searchText, setSearchText] = useState<string>('');

  // Hàm gọi API lấy danh sách tour (GET)
  const fetchTours = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTours(data);
      } else {
        // Nếu API lỗi, dùng dữ liệu mẫu dự phòng
        setTours(INITIAL_TOURS);
      }
    } catch (error) {
      setTours(INITIAL_TOURS);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Tải dữ liệu tour khi component được mount lần đầu
  useEffect(() => {
    fetchTours();
  }, []);

  // Câu 6b: Hàm xử lý kéo xuống để làm mới (giữ nguyên từ khóa tìm kiếm)
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTours();
  };

  // Câu 3d: Khi bấm vào thẻ tour, hiển thị Alert thông tin chi tiết
  const handlePressTour = (tour: Tour) => {
    Alert.alert(
      'Thông tin tour',
      `Tên: ${tour.name}\nKhởi hành: ${formatDate(tour.departure)}\nSố ngày: ${tour.days} ngày\nGiá: ${tour.price.toLocaleString('vi-VN')} ₫`
    );
  };

  // Câu 5: Xử lý cập nhật yêu thích (PUT) với Cập nhật lạc quan & Hoàn tác lỗi
  const handleToggleFavorite = async (id: string, next: boolean) => {
    // 1. Cập nhật lạc quan (Optimistic Update): đổi state ngay lập tức trên giao diện
    setTours((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFavorite: next } : t))
    );

    try {
      // 2. Gửi yêu cầu PUT lên MockAPI
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFavorite: next }),
      });

      if (!res.ok) {
        throw new Error('Lỗi cập nhật API');
      }
    } catch (error) {
      // 3. Hoàn tác (Rollback): nếu API lỗi, trả lại trạng thái cũ và báo Alert (Câu 5c)
      setTours((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isFavorite: !next } : t))
      );
      Alert.alert(
        'Lỗi cập nhật',
        'Không thể cập nhật trạng thái yêu thích từ máy chủ. Đã hoàn tác!'
      );
    }
  };

  // Câu 6a: Lọc tour theo tên bằng useMemo (không phân biệt hoa thường, cắt khoảng trắng trim)
  const filteredTours = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    if (!keyword) return tours;
    return tours.filter((t) => t.name.toLowerCase().includes(keyword));
  }, [tours, searchText]);

  // Câu 2a & 6a: Gom nhóm các tour theo thành phố và tự động ẩn các nhóm không có tour nào
  const sections = useMemo(() => {
    return groupByCity(filteredTours).filter(
      (section) => section.data.length > 0
    );
  }, [filteredTours]);

  // Câu 4c & 6a: Lọc danh sách tour yêu thích (từ tours gốc để không bị ảnh hưởng bởi ô tìm kiếm)
  const favoriteTours = useMemo(() => {
    return tours.filter((t) => t.isFavorite);
  }, [tours]);

  // Câu 4c: Header chứa mục "Tour yêu thích (n)" dạng FlatList ngang
  const renderFavoriteHeader = () => (
    <View style={styles.favoriteSection}>
      <Text style={styles.favoriteTitle}>
        Tour yêu thích ({favoriteTours.length})
      </Text>
      {favoriteTours.length === 0 ? (
        <Text style={styles.emptyFavoriteText}>Chưa có tour yêu thích</Text>
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={favoriteTours}
          keyExtractor={(item) => 'fav-' + item.id}
          ItemSeparatorComponent={() => <View style={styles.favSeparator} />}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact={true} // Dùng bố cục rút gọn cho hàng ngang
              onPress={handlePressTour}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          contentContainerStyle={styles.favoriteListContent}
        />
      )}
    </View>
  );

  return (
    // Câu 1a: Toàn bộ ứng dụng bọc trong SafeAreaProvider
    <SafeAreaProvider>
      {/* Câu 1b: Màn hình chính dùng SafeAreaView và View */}
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        {/* Câu 1c: Phần Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Tour Việt</Text>
          <Text style={styles.studentInfo}>23720251 - Nguyễn Hoàng Thái Bình</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm tour theo tên..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Phần thân danh sách */}
        <View style={styles.content}>
          {/* Câu 2c: Hiển thị ActivityIndicator khi đang tải dữ liệu */}
          {loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#0066CC" />
              <Text style={styles.loadingText}>Đang tải danh sách tour...</Text>
            </View>
          ) : (
            // Câu 2b: Dùng SectionList hiển thị các nhóm tour
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.id}
              stickySectionHeadersEnabled={true} // Tiêu đề nhóm dính trên cùng khi cuộn
              ListHeaderComponent={renderFavoriteHeader} // Mục tour yêu thích ở trên cùng
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#0066CC']}
                />
              }
              // Câu 6b: Thông báo khi tìm kiếm không có kết quả
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    Không tìm thấy tour phù hợp
                  </Text>
                </View>
              }
              // Tiêu đề của từng nhóm thành phố: "Đà Lạt · 3 tour"
              renderSectionHeader={({ section: { title, data } }) => (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>
                    {title} · {data.length} tour
                  </Text>
                </View>
              )}
              // Hiển thị từng tour bằng component TourItem
              renderItem={({ item }) => (
                <TourItem
                  tour={item}
                  compact={false} // Bố cục ngang đầy đủ
                  onPress={handlePressTour}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 4,
  },
  studentInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    fontWeight: '500',
  },
  searchContainer: {
    backgroundColor: '#F0F2F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 14,
    color: '#000',
    paddingVertical: 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  favoriteSection: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  emptyFavoriteText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  favoriteListContent: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  favSeparator: {
    width: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#EBF3FC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D2E3FC',
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0052A3',
  },
  emptyContainer: {
    paddingVertical: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#777',
    fontStyle: 'italic',
  },
});
