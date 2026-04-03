import { useEffect, useState, useRef, useMemo } from "react";
import { Route, Routes, useLocation } from "react-router";
import { scroller } from "react-scroll";
import usePageTheme from "./hooks/usePageTheme";
import NavigationTab from "./organisms/NavigationTab/NavigationTab";
import MainLayout from "./pages/MainLayout";
import { ComponentContext } from "./context/ComponentContext";
import { section, SECTIONS } from "./common/constants";
import { ReadinessContext } from "./context/ReadinessContext";

export type LocationTuple = [section, ...string[]];

export const trimPathname = (pathname: string): string => {
  const pathParts = pathname.split("/").filter(Boolean);

  if (pathParts.length === 0) {
    return "/";
  }

  if (pathParts.length === 1) {
    return "/";
  }

  // Remove the last segment
  pathParts.pop();
  return "/" + pathParts.join("/");
};

const RouterComponent = () => {
  usePageTheme();
  const location = useLocation();
  const initialRenderRef = useRef(true);

  // Track the last visited full pathname per section
  const [sectionPaths, setSectionPaths] = useState<Record<section, string>>(
    () =>
      SECTIONS.reduce(
        (acc, sec) => {
          acc[sec] = `/${sec}`;
          return acc;
        },
        {} as Record<section, string>,
      ),
  );
  const [readyMap, setReadyMap] = useState<Record<string, boolean>>({});

  const setReady = (key: string, value: boolean) => {
    setReadyMap((prev) => ({ ...prev, [key]: value }));
  };

  const isReady = useMemo(() => {
    if (Object.keys(readyMap).length === 2)
      return Object.values(readyMap).every((v) => v === true);
    return false;
  }, [readyMap]);

  useEffect(() => {
    console.log(JSON.stringify(readyMap));
  }, [readyMap]);

  const readinessContextValue = {
    readyMap,
    setReady,
    isReady,
  };

  // Whenever the route changes via navigation, persist the new path for that section
  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const sec = parts[0] as section;
    if (SECTIONS.includes(sec)) {
      setSectionPaths((prev) => ({ ...prev, [sec]: location.pathname }));
    }
  }, [location.pathname]);

  const [locationTuple, setLocationTuple] = useState<LocationTuple | null>();

  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);

    const section = pathParts[0] as section;
    if (SECTIONS.includes(section)) {
      setLocationTuple([section, ...pathParts.slice(1)]);
    } else {
      setLocationTuple(null);
    }
  }, [location.pathname]);

  // Handle first render - scroll to specific section after delay
  useEffect(() => {
    if (locationTuple) {
      // Тут лежит просто охеренный костыль
      if (isReady) {
        console.log(
          "Checking readiness on initial render:",
          JSON.stringify(readyMap),
        );
        scroller.scrollTo(locationTuple[0], {
          duration: 20,
          delay: 0,
          smooth: true,
          offset: 1,
        });
      }
    }
  }, [locationTuple, readyMap]);

  // Scroll to section when navigating to nested routes
  useEffect(() => {
    if (!initialRenderRef.current && locationTuple) {
      const pathParts = location.pathname.split("/").filter(Boolean);
      const isNestedRoute = pathParts.length > 1;

      // if (isNestedRoute) {
      //   scroller.scrollTo(locationTuple[0], {
      //     duration: 500,
      //     delay: 0,
      //     smooth: true,
      //     offset: 1,
      //   });
      // }
    }
  }, [locationTuple, location.pathname]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.365,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id as section;
          if (!sectionName) return;

          // Use the last saved pathname for this section
          const newPath = sectionPaths[sectionName] ?? `/${sectionName}`;

          const newUrl = `${newPath}${window.location.search}${window.location.hash}`;
          const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

          if (currentUrl !== newUrl) {
            window.history.replaceState(null, "", newUrl);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionPaths]);

  return (
    <ComponentContext.Provider value={sectionPaths}>
      <ReadinessContext.Provider value={readinessContextValue}>
        <NavigationTab />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          {SECTIONS.map((section) => (
            <Route
              key={section}
              path={`/${section}`}
              element={<MainLayout />}
            />
          ))}

          <Route path="/services/:serviceId" element={<MainLayout />} />
          <Route path="/doctors/:categoryId" element={<MainLayout />} />
          <Route
            path="/doctors/:categoryId/:doctorId"
            element={<MainLayout />}
          />
        </Routes>
      </ReadinessContext.Provider>
    </ComponentContext.Provider>
  );
};

export default RouterComponent;
