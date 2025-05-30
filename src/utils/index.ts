import { WeekDay } from '../types';

export function normalizeWeekDay(day: string | WeekDay): WeekDay {
    // If input is undefined or null, return Monday as default
    if (!day) return WeekDay.Monday;

    // Create a map for case-insensitive lookup
    const dayNamesMap = {
        'monday': WeekDay.Monday,
        'tuesday': WeekDay.Tuesday,
        'wednesday': WeekDay.Wednesday,
        'thursday': WeekDay.Thursday,
        'friday': WeekDay.Friday,
        'saturday': WeekDay.Saturday,
        'sunday': WeekDay.Sunday
    };

    // Convert input to lowercase for comparison
    const normalized = (typeof day === 'string' ? day : String(day)).toLowerCase();
    
    // Return matched day or default to Monday
    return dayNamesMap[normalized as keyof typeof dayNamesMap] || WeekDay.Monday;
}

export function generateColorFromText(text: string | undefined): string {
  if (!text) {
      // Convert primary color var to HSL for consistency
      const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color') || '#03a9f4';
      return primaryColor;
  }
  
  // Create a hash from the text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert hash to HSL color
  const h = Math.abs(hash % 360);  // Hue (0-360)
  const s = 70;  // Saturation (percentage)
  const l = 45;  // Lightness (percentage)
  
  const rgb = HSLToRGB(h, s, l);
  return `rgb(${rgb})`;
}

export function HSLToRGB(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `${Math.round(255 * f(0))}, ${Math.round(255 * f(8))}, ${Math.round(255 * f(4))}`;
}