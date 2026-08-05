export function getUserErrorMessage(error, fallback) {
  if (error?.status === 404) return 'Khong tim thay du lieu yeu cau.';
  if (error?.status >= 500) return 'Dich vu dang tam thoi khong kha dung.';
  if (error?.message?.toLowerCase().includes('timed out')) {
    return 'Ket noi mat qua lau. Vui long thu lai.';
  }
  if (error?.message?.toLowerCase().includes('connect')) {
    return 'Khong the ket noi. Vui long kiem tra mang va thu lai.';
  }
  return fallback;
}
