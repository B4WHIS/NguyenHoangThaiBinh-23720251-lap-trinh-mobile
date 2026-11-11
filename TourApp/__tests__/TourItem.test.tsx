/// <reference types="jest" />
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TourItem, { Tour } from '../components/TourItem';

// Bộ kiểm thử đơn vị cho Component TourItem (CLO5 - 1đ)
describe('Unit Test: TourItem component', () => {
  // Dữ liệu tour giả lập dùng để test
  const mockTour: Tour = {
    id: '1',
    name: 'Đà Lạt mộng mơ cùng Thái Bình',
    city: 'Đà Lạt',
    days: 3,
    price: 3590000,
    seats: 2,
    departure: '2026-11-05',
    image: 'https://example.com/image.jpg',
    isFavorite: false,
  };

  // Câu 7c: Kiểm tra bố cục compact
  test('compact không hiển thị thành phố, không compact thì có hiển thị', async () => {
    // 1. Khi compact = true: chữ "Đà Lạt" phải bị ẩn đi (queryByText trả về null)
    const { queryByText: queryByTextCompact } = await render(
      <TourItem
        tour={mockTour}
        compact={true}
        onPress={jest.fn()}
        onToggleFavorite={jest.fn()}
      />
    );
    expect(queryByTextCompact('Đà Lạt')).toBeNull();

    // 2. Khi compact = false: chữ "Đà Lạt" phải được hiển thị bình thường
    const { queryByText: queryByTextNormal } = await render(
      <TourItem
        tour={mockTour}
        compact={false}
        onPress={jest.fn()}
        onToggleFavorite={jest.fn()}
      />
    );
    expect(queryByTextNormal('Đà Lạt')).not.toBeNull();
  });

  // Câu 7d: Kiểm tra sự kiện bấm nút tim và bấm vào thẻ tour
  test('nhấn fav-btn gọi onToggleFavorite(id, true) và onPress không được gọi; nhấn tên tour gọi onPress(tour)', async () => {
    const onPressMock = jest.fn();
    const onToggleFavoriteMock = jest.fn();

    const { getByTestId, getByText } = await render(
      <TourItem
        tour={mockTour}
        compact={false}
        onPress={onPressMock}
        onToggleFavorite={onToggleFavoriteMock}
      />
    );

    // 1. Nhấn nút tim (có testID="fav-btn")
    fireEvent.press(getByTestId('fav-btn'));
    // - onToggleFavorite phải được gọi đúng 1 lần với tham số ('1', true)
    expect(onToggleFavoriteMock).toHaveBeenCalledTimes(1);
    expect(onToggleFavoriteMock).toHaveBeenCalledWith('1', true);
    // - onPress tuyệt đối không được gọi (không được bật Alert)
    expect(onPressMock).not.toHaveBeenCalled();

    // 2. Nhấn vào tên tour trên thẻ
    fireEvent.press(getByText('Đà Lạt mộng mơ cùng Thái Bình'));
    // - onPress phải được gọi đúng 1 lần với toàn bộ object mockTour
    expect(onPressMock).toHaveBeenCalledTimes(1);
    expect(onPressMock).toHaveBeenCalledWith(mockTour);
  });
});
