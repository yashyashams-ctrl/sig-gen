/**
 * Checks if a string is a valid web URL (e.g. https://linkedin.com/in/name or linkedin.com/in/name)
 */
export function isValidUrl(val: string): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.length < 4) return false;

  // Must contain at least one dot in domain structure
  const urlToTest = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(urlToTest);
    const host = parsed.hostname;
    // Check host has at least one dot and top-level domain length >= 2
    if (!host.includes('.')) return false;
    const parts = host.split('.');
    const tld = parts[parts.length - 1];
    return tld.length >= 2 && /^[a-zA-Z]+$/.test(tld);
  } catch {
    return false;
  }
}

/**
 * Checks if a string is a valid WhatsApp phone number or WhatsApp URL
 */
export function isValidWhatsApp(val: string): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.length < 5) return false;

  if (trimmed.startsWith('http') || trimmed.includes('wa.me')) {
    return isValidUrl(trimmed);
  }

  // Must contain at least 7 phone digits
  const digits = trimmed.replace(/[^0-9]/g, '');
  return digits.length >= 7;
}

/**
 * Formats a social input value into a valid clickable URL, or returns null if invalid.
 */
export function formatSocialUrl(key: string, val: string): string | null {
  if (!val || typeof val !== 'string') return null;
  const trimmed = val.trim();
  if (!trimmed) return null;

  if (key === 'whatsapp') {
    if (!isValidWhatsApp(trimmed)) return null;
    if (trimmed.startsWith('http') || trimmed.includes('wa.me')) {
      return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    }
    const cleanNum = trimmed.replace(/[^0-9]/g, '');
    return cleanNum.length >= 7 ? `https://wa.me/${cleanNum}` : null;
  }

  if (!isValidUrl(trimmed)) return null;

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
