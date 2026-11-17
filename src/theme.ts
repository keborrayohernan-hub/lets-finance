import { TextStyle } from 'react-native';
import { hasAileron } from './fonts';

/** Colors pulled from the Figma variables in "Adding AI" → Redo of Screens. */
export const colors = {
  brand: '#A0D2DB', // Primary/Default/Selected/Color – headers, nav bar, buttons
  brand60: '#6BB9C7', // Primary/60 – savings segment
  brand30: '#2A646F', // Primary/30 – wants segment
  brandTint: '#EDF6F8', // welcome illustration circle
  text: '#1F2937', // Primary/Default/text
  muted: '#6D6D78', // Text/Muted
  bodyGray: '#575760', // welcome body copy
  fill: '#E9E9EB', // Primary/Default/fill – cards, chips, rows
  background: '#FAFAFA', // Background/-1
  white: '#FFFFFF',
  black: '#000000',
  attention: '#F59F99', // Base color 2/78 – "Needs Attention", money out
  success: '#669C63', // Text/Success – goal progress, money in
  successSoft: '#84B082', // Status/Success – welcome bar
  progress: '#7DAB7B', // onboarding progress steps
  track: '#D1D5DB', // Background/+3 – inactive onboarding steps
  secondary: '#AFAFB6', // Text/Secondary – progress track
  border: '#CACACE', // System/80 – input outlines
  danger: '#E82517', // Status/Danger – welcome bar
  divider: '#E9E9EB',
};

/** Radii from the Figma variables (Large = 8, XL = 16, Circular = 1000). */
export const radius = { large: 8, button: 15, xl: 16, pill: 20, circular: 1000 };

type Weight = 'regular' | 'book' | 'semibold' | 'bold';

const families: Record<Weight, string> = {
  regular: 'Aileron-Regular',
  book: 'Aileron-Light',
  semibold: 'Aileron-SemiBold',
  bold: 'Aileron-Bold',
};
const weights: Record<Weight, TextStyle['fontWeight']> = {
  regular: '400',
  book: '300',
  semibold: '600',
  bold: '700',
};

/** Uses Aileron when its font files are bundled (see src/fonts.ts), otherwise the system font at the same weight. */
export function font(weight: Weight): TextStyle {
  return hasAileron ? { fontFamily: families[weight] } : { fontWeight: weights[weight] };
}

/** Text styles named after the Figma text styles. */
export const type = {
  title36: { ...font('bold'), fontSize: 36, lineHeight: 38, color: colors.text },
  title24: { ...font('bold'), fontSize: 24, lineHeight: 32, color: colors.text },
  header18: { ...font('semibold'), fontSize: 18, lineHeight: 20, color: colors.text },
  header16: { ...font('semibold'), fontSize: 16, lineHeight: 18, color: colors.text },
  header14: { ...font('semibold'), fontSize: 14, lineHeight: 17, color: colors.text },
  header12: { ...font('semibold'), fontSize: 12, lineHeight: 14, color: colors.text },
  body16: { ...font('regular'), fontSize: 16, lineHeight: 18, color: colors.text },
  body14: { ...font('regular'), fontSize: 14, lineHeight: 16, color: colors.text },
  body12: { ...font('regular'), fontSize: 12, lineHeight: 14, color: colors.text },
  label11: { ...font('semibold'), fontSize: 11, lineHeight: 13, color: colors.white },
  nav11: { ...font('regular'), fontSize: 11, lineHeight: 13, color: colors.text },
} satisfies Record<string, TextStyle>;

/**
 * The Figma frames are 430 × 932 (iPhone Pro Max) and include a 59 pt status bar area.
 * `designTop(y, insetTop)` converts a y-position from the design into one that sits
 * the same distance below the real status bar on any phone.
 */
export const DESIGN_STATUS_BAR = 59;
export function designTop(y: number, insetTop: number) {
  return Math.max(0, y - DESIGN_STATUS_BAR) + insetTop;
}
