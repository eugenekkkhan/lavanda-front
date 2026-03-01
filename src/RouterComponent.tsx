import { useEffect, useState, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { scroller } from "react-scroll";
import usePageTheme from "./hooks/usePageTheme";
import NavigationTab from "./organisms/NavigationTab/NavigationTab";
import MainLayout from "./pages/MainLayout";
import { ComponentContext } from "./context/ComponentContext";
import { section, SECTIONS } from "./common/constants";

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

const getContextValue = (pathname: string): Record<string, string> => {
  const contextValue = SECTIONS.reduce(
    (acc, sec) => ({
      ...acc,
      [sec]: sec,
    }),
    {} as Record<string, string>,
  );

  const pathParts = pathname.split("/").filter(Boolean);
  const sectionName = pathParts[0] as section;

  if (SECTIONS.includes(sectionName)) {
    contextValue[sectionName] = sectionName;
  }

  return contextValue;
};

const RouterComponent = () => {
  usePageTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const contextValue = getContextValue(location.pathname);
  const initialRenderRef = useRef(true);

  const [serviceId, setServiceId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);

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
    if (initialRenderRef.current && locationTuple) {
      scroller.scrollTo(locationTuple[0], {
        duration: 500,
        delay: 0,
        smooth: true,
        offset: 0,
      });
    }
  }, [locationTuple]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id;
          let newPath: string = "";
          if (sectionName) {
            newPath = `/${sectionName}`;
          }

          // if (sectionId === 'services' && serviceId) {
          //   newPath = `/services/${serviceId}`
          // } else if (sectionId === 'doctors') {
          //   if (doctorId && categoryId) {
          //     newPath = `/doctors/${categoryId}/${doctorId}`
          //   } else if (categoryId) {
          //     newPath = `/doctors/${categoryId}`
          //   }
          // }

          if (window.location.pathname !== newPath) {
            window.history.replaceState(null, "", newPath);
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
  }, [serviceId, categoryId, doctorId]);

  return (
    <ComponentContext.Provider value={contextValue}>
      <NavigationTab />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        {SECTIONS.map((section) => (
          <Route key={section} path={`/${section}`} element={<MainLayout />} />
        ))}

        <Route path="/services/:serviceId" element={<MainLayout />} />
        <Route path="/doctors/:categoryId" element={<MainLayout />} />
        <Route path="/doctors/:categoryId/:doctorId" element={<MainLayout />} />
      </Routes>
    </ComponentContext.Provider>
  );
};

export default RouterComponent;
