export const LETTER_SPACING = {
  LETTER_SPACING_DEFAULT: 0,
  LETTER_SPACING_SMALL: 0.1,
  LETTER_SPACING_CAPTION: 0.2,
  LETTER_SPACING_OVERLINE: 0.5,
} as const;

export type LETTER_SPACING = keyof typeof LETTER_SPACING;