import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  tertiaryColor?: string;
  components?: {
    contactPill?: {
      primaryColor?: string;
      secondaryColor?: string;
    }
  }
}

const THEMES: Record<string, ThemeConfig> = {
  "/": {
    primaryColor: "#ffffff",
    secondaryColor: "#404040",
    accentColor: "#404040",
    tertiaryColor: "#bdb2ff",
    components: {
      contactPill: {
        primaryColor: "#bdb2ff",
        secondaryColor: "#ffffff",
      },
    },
  },
  "#home": {
    primaryColor: "#ffffff",
    secondaryColor: "#404040",
    accentColor: "#404040",
    tertiaryColor: "#bdb2ff",
    components: {
      contactPill: {
        primaryColor: "#bdb2ff",
        secondaryColor: "#ffffff",
      },
    },
  },
  "#services": {
    primaryColor: "#bdb2ff",
    secondaryColor: "#ffffff",
    accentColor: "#404040",
    tertiaryColor: "#ffffff",
  },
  "#doctors": {
    primaryColor: "#ECFFE8",
    secondaryColor: "#000000B3",
    accentColor: "#404040",
    tertiaryColor: "#000000B3",
  },
  "#contacts": {
    primaryColor: "#ffffff",
    secondaryColor: "#404040",
    accentColor: "#404040",
    tertiaryColor: "#bdb2ff",
    components: {
      contactPill: {
        primaryColor: "#bdb2ff",
        secondaryColor: "#ffffff",
      },
    },
  },
  "#footer": {
    primaryColor: "#bdb2ff",
    secondaryColor: "#ffffff",
    accentColor: "#404040",
    components: {
      contactPill: {
        primaryColor: "#ffffff",
        secondaryColor: "#bdb2ff",
      },
    },
  },
};
const SECTIONS = ["home", "services", "doctors", "contacts", "footer"];
const THEME_SWITCH_DEBOUNCE_MS = 120;

export const usePageTheme = () => {
  const { pathname } = useLocation();
  const [activeHash, setActiveHash] = useState(window.location.hash || "#home");
  const debounceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-49% 0px -49% 0px",
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (entries) => {
      const intersectingEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!intersectingEntry) return;

      if (debounceTimeoutRef.current) {
        window.clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = window.setTimeout(() => {
        setActiveHash(`#${intersectingEntry.target.id}`);
        debounceTimeoutRef.current = null;
      }, THEME_SWITCH_DEBOUNCE_MS);
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (debounceTimeoutRef.current) {
        window.clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const currentTheme = THEMES[activeHash] || THEMES["/"];
    const root = document.documentElement;

    root.style.setProperty("--color-primary", currentTheme.primaryColor);
    root.style.setProperty("--color-secondary", currentTheme.secondaryColor);
    root.style.setProperty(
      "--color-accent",
      currentTheme.accentColor || currentTheme.secondaryColor,
    );
    root.style.setProperty(
      "--color-tertiary",
      currentTheme.tertiaryColor || currentTheme.secondaryColor,
    );
    root.style.setProperty(
      "--color-contactPill-primary",
      currentTheme.components?.contactPill?.primaryColor || currentTheme.primaryColor,
    );
    root.style.setProperty(
      "--color-contactPill-secondary",
      currentTheme.components?.contactPill?.secondaryColor || currentTheme.secondaryColor,
    );
  }, [activeHash, pathname]);
};
export default usePageTheme;
