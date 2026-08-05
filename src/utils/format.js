export function formatCurrency(value, locale = 'vi-VN') {
  return Number(value || 0).toLocaleString(locale, {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
  });
}
