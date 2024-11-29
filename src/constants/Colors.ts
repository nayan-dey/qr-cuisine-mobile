export const COLORS = {
  // Primary colors
  COLOR_PRIMARY: "#4CAF50",
  COLOR_PRIMARY_DARK: "#2D6830",
  COLOR_PRIMARY_LIGHT: "#9DD89F",

  // Secondary colors
  COLOR_SECONDARY: "#FFA808",
  COLOR_SECONDARY_DARK: "#B78103",
  COLOR_SECONDARY_LIGHT: "#FFE16A",

  // Background and surface
  COLOR_BACKGROUND: "#F8F8FF",
  COLOR_SURFACE: "#F4F4F4",

  // Text colors
  COLOR_TEXT_PRIMARY: "#010101",
  COLOR_TEXT_MUTED: "rgba(1, 1, 1, 0.7)",
  COLOR_TEXT_SECONDARY: "#71717A",
  COLOR_TEXT_PLACEHOLDER: "rgba(113, 113, 122, 0.7)",
  COLOR_TEXT_INVERSE: "#FFFFFF",

  // Border
  COLOR_BORDER: "#E0E0E0",

  // Status colors
  COLOR_SUCCESS: "#17C964",
  COLOR_ERROR: "#F31260",
  COLOR_WARNING: "#f5a524",
  COLOR_INFO: "#338ef7",

  // Overlay
  COLOR_OVERLAY: "rgba(0, 0, 0, 0.5)",
} as const;

export type COLORS = keyof typeof COLORS;
