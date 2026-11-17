/**
 * Aileron is the typeface used throughout the Figma file. It's free (SIL Open Font License)
 * but isn't bundled here. To switch it on:
 *
 *   1. Download Aileron (e.g. from fontsquirrel.com/fonts/aileron or dotcolon.net/font/aileron)
 *   2. Copy these four files into assets/fonts/:
 *        Aileron-Regular.otf, Aileron-Light.otf, Aileron-SemiBold.otf, Aileron-Bold.otf
 *   3. Uncomment the four lines below and reload the app.
 *
 * Until then the app uses the system font at the same sizes and weights.
 */
export const fontFiles: Record<string, number> = {
  // 'Aileron-Regular': require('../assets/fonts/Aileron-Regular.otf'),
  // 'Aileron-Light': require('../assets/fonts/Aileron-Light.otf'),
  // 'Aileron-SemiBold': require('../assets/fonts/Aileron-SemiBold.otf'),
  // 'Aileron-Bold': require('../assets/fonts/Aileron-Bold.otf'),
};

export const hasAileron = Object.keys(fontFiles).length > 0;
