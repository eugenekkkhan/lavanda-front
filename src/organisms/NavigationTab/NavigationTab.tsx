import React, { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import Stack from "../../atoms/Stack/Stack";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { AnimatePresence, motion } from "framer-motion";

type Section = {
  title: string;
  link: string;
  ref: React.RefObject<HTMLAnchorElement>;
  mobileRef: React.RefObject<HTMLAnchorElement>;
};

const NavigationTab = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const navSections = [
    { title: "Главная", link: "home" },
    { title: "Услуги", link: "services" },
    { title: "Врачи", link: "doctors" },
    { title: "Расписание", link: "schedule" },
    { title: "Контакты", link: "contacts" },
  ];

  useEffect(() => {
    const newSections = navSections.map((sec) => ({
      ...sec,
      ref: React.createRef<HTMLAnchorElement>(),
      mobileRef: React.createRef<HTMLAnchorElement>(),
    }));
    setSections(newSections);

    const hash = window.location.hash.slice(1) || "home";
    const index = newSections.findIndex((sec) => sec.link === hash);
    setActiveSectionIndex(index >= 0 ? index : 0);

    // Check if mobile on mount and on resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Listen for hash changes and update active section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      const index = sections.findIndex((sec) => sec.link === hash);
      setActiveSectionIndex(index >= 0 ? index : 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [sections]);

  const handleNavClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const sectionName = sections[index].link;
    setActiveSectionIndex(index);

    // Scroll to section with react-scroll
    scroller.scrollTo(sectionName, {
      duration: 800,
      delay: 0,
      smooth: true,
      offset: -80, // Account for navbar height
      onSrcollEnd: () => {
        window.location.hash = sectionName;
      }
    });
  };

  return (
    <motion.div
      className={`w-full fixed top-[18px] flex px-[18px] z-50 transition-all`}
      animate={{ justifyContent: isMobile ? "flex-end" : "center" }}
    >
      <AnimatePresence>
        <Stack
          className="absolute bg-gray-400/30 text-white rounded-3xl z-100 backdrop-blur-md shadow-md"
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
        >
          {!isMobile && (
            <DesktopNav
              sections={sections}
              activeSectionIndex={activeSectionIndex}
              onNavClick={handleNavClick}
            />
          )}
          {isMobile && (
            <MobileNav
              sections={sections}
              activeSectionIndex={activeSectionIndex}
              onNavClick={handleNavClick}
            />
          )}
        </Stack>
      </AnimatePresence>
    </motion.div>
  );
};

export default NavigationTab;
