export function detectMobileDevice(): 'ios' | 'android' | 'other' {
  if (typeof window === 'undefined') {
    return 'other'; // Default for server-side rendering
  }
  
  interface WindowWithOpera extends Window {
    opera?: unknown;
    MSStream?: unknown;
  }
  
  const win = window as WindowWithOpera;
  const userAgent = navigator.userAgent || navigator.vendor || win.opera || '';
  
  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent as string) && !win.MSStream) {
    return 'ios';
  }
  
  // Android detection
  if (/android/i.test(userAgent as string)) {
    return 'android';
  }
  
  return 'other';
} 