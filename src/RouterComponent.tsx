import { useEffect } from "react";
import { scroller } from "react-scroll";
import HeroSection from "./organisms/HeroSection/HeroSection";
import ServiceSection from "./organisms/ServiceSection/ServiceSection";

const RouterComponent = () => {
  // Handle hash changes with react-scroll
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        scroller.scrollTo(hash, {
          duration: 800,
          delay: 0,
          smooth: true,
          offset: -30, // Account for navbar height
        });
      }
    };

    // Handle initial hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Intersection Observer to detect which section is in view and update URL
  useEffect(() => {
    const sections = ["home", "services"];
    const observerOptions = {
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          window.history.replaceState(null, "", `#${sectionId}`);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <>
      <section id="home">
        <HeroSection />
      </section>
      <section id="services">
        <ServiceSection />
      </section>
    </>
  );
};

export default RouterComponent;
