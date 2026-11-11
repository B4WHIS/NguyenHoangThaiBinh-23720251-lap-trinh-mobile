import { Product } from '../types';

export const CATEGORIES = ['Tất cả', 'Điện thoại', 'Laptop', 'Tai nghe', 'Phụ kiện'] as const;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    price: 29990000,
    category: 'Điện thoại',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: 27990000,
    category: 'Điện thoại',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'MacBook Pro 14 M3',
    price: 39990000,
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Dell XPS 13 Plus',
    price: 32500000,
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    price: 7490000,
    category: 'Tai nghe',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'AirPods Pro 2 USB-C',
    price: 5690000,
    category: 'Tai nghe',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400',
    rating: 4.8,
  },
  {
    id: 7,
    name: 'Bàn phím cơ Keychron K2 Pro',
    price: 2190000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    rating: 4.6,
  },
  {
    id: 8,
    name: 'Chuột Logitech MX Master 3S',
    price: 2390000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    rating: 4.8,
  },
];
