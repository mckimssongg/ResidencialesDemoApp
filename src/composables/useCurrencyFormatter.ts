export function useCurrencyFormatter() {
  const formatCurrency = (value: number, currency = 'MXN', locale = 'es-MX') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  return {
    formatCurrency,
  };
}
