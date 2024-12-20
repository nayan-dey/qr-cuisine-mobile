export const LINE_HEIGHT = {
  LINE_LARGE_TITLE: 38,
  LINE_TITLE: 32,
  LINE_SUBTITLE: 28,
  LINE_BODY: 24,
  LINE_SMALL_TEXT: 20,
  LINE_CAPTION: 16,
  LINE_BUTTON: 20,
  LINE_OVERLINE: 14,
  LINE_PLACEHOLDER: 20,
} as const;

export type LINE_HEIGHT = keyof typeof LINE_HEIGHT;
