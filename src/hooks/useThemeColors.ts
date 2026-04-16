import { useLayoutEffect, useState } from "react";

interface ThemeColors {
  fill: string;
  stroke: string;
}

/**
 * Hook to get current theme colors from CSS custom properties.
 * Reads --color-secondary (text color) which changes based on page section.
 */
export const useThemeColors = (): ThemeColors => {
  const [colors, setColors] = useState<ThemeColors>(() => {
    if (typeof window === "undefined") {
      return { fill: "#404040", stroke: "#404040" };
    }

    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const secondaryColor = computedStyle
      .getPropertyValue("--color-secondary")
      .trim();
    const color = secondaryColor || "#404040";

    return { fill: color, stroke: color };
  });

  useLayoutEffect(() => {
    // Update colors whenever DOM/styles might have changed
    const updateColors = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      const secondaryColor = computedStyle
        .getPropertyValue("--color-secondary")
        .trim();
      const color = secondaryColor || "#404040";

      setColors({ fill: color, stroke: color });
    };

    updateColors();

    // Listen for changes to CSS variables
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
