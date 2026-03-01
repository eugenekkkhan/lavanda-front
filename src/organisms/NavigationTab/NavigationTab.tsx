import React, { useEffect, useState } from "react";
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

const NAV_SECTIONS = [
  { title: "Главная", link: "home" },
  { title: "Услуги", link: "services" },
  { title: "Врачи", link: "doctors" },
  { title: "Контакты", link: "contacts" },
];

const NavigationTab = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Disable snap during scroll animation
  const disableSnapDuringScroll = () => {
    const html = document.documentElement;
    html.style.scrollSnapType = "none";
    setTimeout(() => {
      html.style.scrollSnapType = "y mandatory";
    }, 850); // Slightly longer than react-scroll duration (800ms)
  };

  useEffect(() => {
    const newSections = NAV_SECTIONS.map((sec) => ({
      ...sec,
      ref: React.createRef<HTMLAnchorElement>(),
      mobileRef: React.createRef<HTMLAnchorElement>(),
    }));
    setSections(newSections);

    // Check if mobile on mount and on resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Called by react-scroll's onSetActive callback
  const handleSetActive = (sectionLink: string) => {
    const index = NAV_SECTIONS.findIndex((sec) => sec.link === sectionLink);
    if (index >= 0) {
      setActiveSectionIndex(index);
    }
  };

  return (
    <motion.div
      className={`w-full fixed top-[18px] flex px-[18px] z-50 transition-all`}
      animate={{ justifyContent: isMobile ? "flex-end" : "center" }}
    >
      <AnimatePresence>
        <Stack
          className="absolute bg-[var(--color-accent)]/30 text-[var(--color-secondary)] rounded-3xl z-100 backdrop-blur-md shadow-md"
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
              onSetActive={handleSetActive}
              onNavigate={disableSnapDuringScroll}
            />
          )}
          {isMobile && (
            <MobileNav
              sections={sections}
              activeSectionIndex={activeSectionIndex}
              onSetActive={handleSetActive}
              onNavigate={disableSnapDuringScroll}
            />
          )}
        </Stack>
      </AnimatePresence>
    </motion.div>
  );
};

export default NavigationTab;
