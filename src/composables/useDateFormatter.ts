export function useDateFormatter() {
  const formatDate = (date: string | Date, locale = 'es-MX') => {
    const d = new Date(date);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
  };

  const formatRelativeTime = (date: string | Date, locale = 'es-MX') => {
    const d = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second');
    if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  };

  return {
    formatDate,
    formatRelativeTime
  };
}
