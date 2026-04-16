import { useLayoutEffect, useState } from "react";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  tertiary: string;
  contactPillPrimary: string;
  contactPillSecondary: string;
  fill: string;
  stroke: string;
  logoFill: string;
  logoStroke: string;
}

const FALLBACK_THEME_COLORS: ThemeColors = {
  primary: "#ffffff",
  secondary: "#404040",
  accent: "#404040",
  tertiary: "#bdb2ff",
  contactPillPrimary: "#ffffff",
  contactPillSecondary: "#404040",
  fill: "#bdb2ff",
  stroke: "#404040",
  logoFill: "#bdb2ff",
  logoStroke: "#404040",
};

const readThemeColors = (root: HTMLElement): ThemeColors => {
  const computedStyle = getComputedStyle(root);
  const primary = computedStyle.getPropertyValue("--color-primary").trim();
  const secondary = computedStyle.getPropertyValue("--color-secondary").trim();
  const accent = computedStyle.getPropertyValue("--color-accent").trim();
  const tertiary = computedStyle.getPropertyValue("--color-tertiary").trim();
  const contactPillPrimary = computedStyle
    .getPropertyValue("--color-contactPill-primary")
    .trim();
  const contactPillSecondary = computedStyle
    .getPropertyValue("--color-contactPill-secondary")
    .trim();

  const resolvedPrimary = primary || FALLBACK_THEME_COLORS.primary;
  const resolvedSecondary = secondary || FALLBACK_THEME_COLORS.secondary;
  const resolvedAccent = accent || resolvedSecondary;
  const resolvedTertiary = tertiary || FALLBACK_THEME_COLORS.tertiary;
  const resolvedContactPillPrimary = contactPillPrimary || resolvedPrimary;
  const resolvedContactPillSecondary =
    contactPillSecondary || resolvedSecondary;

  return {
    primary: resolvedPrimary,
    secondary: resolvedSecondary,
    accent: resolvedAccent,
    tertiary: resolvedTertiary,
    contactPillPrimary: resolvedContactPillPrimary,
    contactPillSecondary: resolvedContactPillSecondary,
    fill: resolvedTertiary,
    stroke: resolvedSecondary,
    logoFill: resolvedTertiary,
    logoStroke: resolvedSecondary,
  };
};

/**
 * Hook to get current theme colors from CSS custom properties.
 * Returns the full resolved palette plus convenient aliases for SVG assets.
 */
export const useThemeColors = (): ThemeColors => {
  const [colors, setColors] = useState<ThemeColors>(() => {
    if (typeof window === "undefined") {
      return FALLBACK_THEME_COLORS;
    }

    return readThemeColors(document.documentElement);
  });

  useLayoutEffect(() => {
    const updateColors = () => {
      setColors(readThemeColors(document.documentElement));
    };

    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  return colors;
};

export default useThemeColors;
