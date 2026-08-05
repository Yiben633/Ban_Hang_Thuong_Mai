export const categories = [
  { name: 'Thiet ke', detail: 'Do dung co ban, toi gian' },
  { name: 'Van phong', detail: 'Vat dung cho ngay lam viec' },
  { name: 'Gia dung', detail: 'Nang cap khong gian song' },
];

export const products = [
  {
    id: '1',
    name: 'Den ban Grid',
    category: 'Gia dung',
    price: 499000,
    description: 'Den ban toi gian voi anh sang mem, phu hop cho goc lam viec.',
    tone: 'bg-neutral-200',
  },
  {
    id: '2',
    name: 'So tay Plain',
    category: 'Van phong',
    price: 199000,
    description: 'So tay giay day, bo cuc don gian cho ghi chu hang ngay.',
    tone: 'bg-neutral-300',
  },
  {
    id: '3',
    name: 'Binh nuoc Form',
    category: 'Gia dung',
    price: 799000,
    description: 'Binh nuoc giu nhiet voi thiet ke gon gang, de mang theo.',
    tone: 'bg-neutral-100',
  },
  {
    id: '4',
    name: 'Ghe ngoi Line',
    category: 'Thiet ke',
    price: 1099000,
    description: 'Ghe ngoi da nang voi duong net sach va ket cau vung chac.',
    tone: 'bg-neutral-400',
  },
  {
    id: '5',
    name: 'Khay dung Tray',
    category: 'Gia dung',
    price: 349000,
    description: 'Khay dung nho gon giup sap xep ban lam viec ngan nap.',
    tone: 'bg-neutral-200',
  },
  {
    id: '6',
    name: 'Tui vai Daily',
    category: 'Thiet ke',
    price: 289000,
    description: 'Tui vai ben, nhe va phu hop cho nhieu nhu cau hang ngay.',
    tone: 'bg-neutral-300',
  },
];

export function formatPrice(price) {
  return `${price.toLocaleString('vi-VN')} VND`;
}
