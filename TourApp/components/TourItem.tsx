import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { formatDate, getSeatLabel } from '../utils/tour';

// Khai báo kiểu Tour (Câu 3a)
export interface Tour {
  id: string;
  name: string;
  city: string;
  days: number;
  price: number;
  seats: number;
  departure: string;
  image: string;
  isFavorite: boolean;
}

// Khai báo kiểu Props truyền vào component TourItem (Câu 3a)
export interface TourItemProps {
  tour: Tour;                                                     // Dữ liệu tour hiển thị
  compact?: boolean;                                              // Bố cục rút gọn (mặc định false)
  onPress: (tour: Tour) => void;                                  // Sự kiện khi bấm vào thẻ tour
  onToggleFavorite: (id: string, next: boolean) => void;          // Sự kiện khi bấm vào nút tim
}

function TourItem({
  tour,
  compact = false, // Mặc định là false (bố cục ngang đầy đủ)
  onPress,
  onToggleFavorite,
}: TourItemProps) {
  // Kiểm tra nếu số chỗ <= 3 để đổi màu cảnh báo đỏ
  const isLimitedSeat = tour.seats <= 3;

  return (
    // Kết hợp style mảng: nếu compact=true thì áp dụng thêm style containerCompact (Câu 4a, 4b)
    <View style={[styles.container, compact && styles.containerCompact]}>
      {/* Vùng nhấn chính của thẻ: khi bấm gọi onPress hiển thị Alert */}
      <TouchableOpacity
        style={[styles.contentTouch, compact && styles.contentTouchCompact]}
        activeOpacity={0.7}
        onPress={() => onPress(tour)}
      >
        {/* Khung chứa ảnh: khi compact=true thì có position relative để nút tim đè lên */}
        <View style={compact ? styles.imageWrapperCompact : undefined}>
          <Image
            source={{ uri: tour.image }}
            style={[styles.image, compact && styles.imageCompact]}
          />
          {/* Nút tim khi compact=true: đặt đè lên góc phải trên ảnh */}
          {compact && (
            <TouchableOpacity
              testID="fav-btn"
              style={styles.favBtnCompact}
              onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
            >
              <Text
                style={[
                  styles.favIcon,
                  tour.isFavorite && styles.favIconActive,
                ]}
              >
                {tour.isFavorite ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Khung thông tin tour */}
        <View style={[styles.info, compact && styles.infoCompact]}>
          {/* Tên tour: compact thì giới hạn 1 dòng, thường thì tối đa 2 dòng */}
          <Text
            style={[styles.name, compact && styles.nameCompact]}
            numberOfLines={compact ? 1 : 2}
          >
            {tour.name}
          </Text>

          {/* Thành phố: CHỈ HIỂN THỊ khi compact=false (Câu 4b yêu cầu ẩn khi compact=true) */}
          {!compact && <Text style={styles.city}>{tour.city}</Text>}

          {/* Ngày khởi hành và số ngày: Ẩn khi compact=true */}
          {!compact && (
            <Text style={styles.departure}>
              📅 {formatDate(tour.departure)} · {tour.days} ngày
            </Text>
          )}

          {/* Dòng giá tiền và số chỗ */}
          <View style={[styles.bottomRow, compact && styles.bottomRowCompact]}>
            <Text style={[styles.price, compact && styles.priceCompact]}>
              {tour.price.toLocaleString('vi-VN')} ₫
            </Text>
            {/* Nhãn số chỗ: Ẩn khi compact=true; đổi màu đỏ khi <= 3 chỗ */}
            {!compact && (
              <Text style={[styles.seats, isLimitedSeat && styles.seatsWarning]}>
                {getSeatLabel(tour.seats)}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {/* Nút tim khi compact=false: nằm riêng biệt ở mép phải (Câu 3d) */}
      {!compact && (
        <TouchableOpacity
          testID="fav-btn"
          style={styles.favBtn}
          onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
        >
          <Text style={[styles.favIcon, tour.isFavorite && styles.favIconActive]}>
            {tour.isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Bảng định nghĩa kiểu dáng style dùng StyleSheet.create (Câu 4a)
const styles = StyleSheet.create({
  // Style cho thẻ thường (compact = false): bố cục ngang
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    paddingRight: 8,
  },
  // Style ghi đè cho thẻ rút gọn (compact = true): thẻ dọc chiều rộng 160
  containerCompact: {
    flexDirection: 'column',
    width: 160,
    marginHorizontal: 0,
    marginTop: 0,
    paddingRight: 0,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  contentTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  contentTouchCompact: {
    flex: 0,
    flexDirection: 'column',
    padding: 0,
    alignItems: 'stretch',
  },
  imageWrapperCompact: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  // Ảnh khi compact: chiếm hết chiều ngang thẻ với tỉ lệ 4:3
  imageCompact: {
    width: '100%',
    height: undefined,
    aspectRatio: 4 / 3,
    borderRadius: 0,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  infoCompact: {
    flex: 0,
    marginLeft: 0,
    padding: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  nameCompact: {
    fontSize: 13,
    marginBottom: 4,
  },
  city: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  departure: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  bottomRowCompact: {
    marginTop: 2,
    justifyContent: 'flex-start',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E53935',
  },
  priceCompact: {
    fontSize: 13,
  },
  seats: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  seatsWarning: {
    color: '#D32F2F', // Màu đỏ cảnh báo khi hết chỗ hoặc <= 3 chỗ
  },
  favBtn: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Nút tim đè lên góc phải trên ảnh khi compact=true (Câu 4b)
  favBtnCompact: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: {
    fontSize: 24,
    color: '#999',
  },
  favIconActive: {
    color: '#E53935', // Tim đỏ khi isFavorite = true
  },
});

// Câu 3a: Export component qua React.memo để tối ưu render
export default React.memo(TourItem);
