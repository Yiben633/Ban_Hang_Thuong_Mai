export function getUserErrorMessage(error, fallback) {
  if (error?.status === 404) return 'Không tìm thấy dữ liệu yêu cầu.';
  if (error?.status >= 500) return 'Dịch vụ đang tạm thời không khả dụng.';
  if (error?.message?.toLowerCase().includes('timed out')) {
    return 'Kết nối mất quá lâu. Vui lòng thử lại.';
  }
  if (error?.message?.toLowerCase().includes('connect')) {
    return 'Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.';
  }
  return fallback;
}
