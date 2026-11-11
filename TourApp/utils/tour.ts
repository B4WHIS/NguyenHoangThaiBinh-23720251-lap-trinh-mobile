// Định nghĩa cấu trúc dữ liệu của một Tour du lịch theo yêu cầu đề bài
export interface Tour {
  id: string;             // Mã định danh của tour
  name: string;           // Tên tour du lịch
  city: string;           // Thành phố điểm đến
  days: number;           // Số ngày đi tour
  price: number;          // Giá vé (VNĐ)
  seats: number;          // Số chỗ ngồi còn lại
  departure: string;      // Ngày khởi hành (định dạng YYYY-MM-DD)
  image: string;          // Đường dẫn ảnh minh họa
  isFavorite: boolean;    // Trạng thái yêu thích (true/false)
}

// Cấu trúc dữ liệu của một nhóm trong SectionList
export interface TourSection {
  title: string;          // Tên thành phố (tiêu đề nhóm)
  data: Tour[];           // Danh sách các tour thuộc thành phố đó
}

// Câu 2a: Hàm gom nhóm các tour theo thành phố (city)
// - Các nhóm sắp xếp theo tên thành phố A -> Z
// - Các tour trong từng nhóm sắp xếp theo ngày khởi hành tăng dần
export function groupByCity(tours: Tour[]): TourSection[] {
  const groups: { [city: string]: Tour[] } = {};

  // Gom các tour có cùng thành phố vào chung một mảng
  tours.forEach((tour) => {
    if (!groups[tour.city]) {
      groups[tour.city] = [];
    }
    groups[tour.city].push(tour);
  });

  // Lấy danh sách tên thành phố và sắp xếp bảng chữ cái từ A đến Z
  const sortedCities = Object.keys(groups).sort((a, b) => a.localeCompare(b));

  // Trả về mảng các nhóm với tour trong mỗi nhóm sắp xếp theo ngày khởi hành tăng dần
  return sortedCities.map((city) => ({
    title: city,
    data: groups[city].sort((a, b) => a.departure.localeCompare(b.departure)),
  }));
}

// Câu 3b: Hàm chuyển đổi định dạng ngày từ "YYYY-MM-DD" sang "DD/MM/YYYY"
// Ví dụ: "2026-11-05" -> "05/11/2026"
export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

// Câu 3b: Hàm trả về nhãn hiển thị số chỗ còn lại:
// - 0 chỗ: "Hết chỗ"
// - 1 đến 3 chỗ: "Chỉ còn N chỗ"
// - Lớn hơn 3 chỗ: "Còn N chỗ"
export function getSeatLabel(seats: number): string {
  if (seats === 0) return 'Hết chỗ';
  if (seats >= 1 && seats <= 3) return `Chỉ còn ${seats} chỗ`;
  return `Còn ${seats} chỗ`;
}
