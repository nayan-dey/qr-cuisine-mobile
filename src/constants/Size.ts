/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const size = {
  xxxs: 2,
  xxs: 4,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 22,
  xxxl: 35,
  regular: 16,
} as const;

export type Size = keyof typeof size;
