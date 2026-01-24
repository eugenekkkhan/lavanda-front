import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Section = {
  title: string;
  link: string;
  mobileRef: React.RefObject<HTMLAnchorElement>;
};

interface MobileNavProps {
  sections: Section[];
  activeSectionIndex: number;
  onNavClick: (index: number, e: React.MouseEvent) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  sections,
  activeSectionIndex,
  onNavClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobilePillDimensions, setMobilePillDimensions] = useState({
    width: 0,
    top: 0,
  });
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMobilePillDimensions = () => {
      const activeRef = sections[activeSectionIndex]?.mobileRef;
      if (activeRef?.current && mobileContainerRef.current) {
        const activeElement = activeRef.current;
        const containerRect =
          mobileContainerRef.current.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();

        setMobilePillDimensions({
          width: elementRect.width,
          top: elementRect.top - containerRect.top + 22,
        });
      }
    };

    updateMobilePillDimensions();
  }, [activeSectionIndex, sections, isMobileMenuOpen]);

  const handleNavClick = (index: number, e: React.MouseEvent) => {
    onNavClick(index, e);
    setIsMobileMenuOpen(false);
  };

  const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="min-h-[38px] min-w-[38px] rounded-full relative z-30"
      aria-label="Toggle menu"
    >
      <motion.span
        className="w-[22px] h-0.5 bg-white absolute left-[8px]"
        animate={{
          rotate: isOpen ? 45 : 0,
          top: isOpen ? "18px" : "12px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      ></motion.span>
      <motion.span
        className="w-[22px] h-0.5 bg-white absolute left-[8px]"
        animate={{ opacity: isOpen ? 0 : 1, top: "18px" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      ></motion.span>
      <motion.span
        className="w-[22px] h-0.5 bg-white absolute left-[8px]"
        animate={{
          rotate: isOpen ? -45 : 0,
          top: isOpen ? "18px" : "24px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      ></motion.span>
    </button>
  );

  return (
    <motion.div
      className="flex flex-col items-end justify-between p-[2px] overflow-hidden"
      initial={false}
      animate={{
        width: isMobileMenuOpen ? 129 : 42,
        height: isMobileMenuOpen ? 282 : 42,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Mobile pill background */}
      {isMobileMenuOpen && (
        <motion.div
          ref={mobileContainerRef}
          className="absolute h-[38px] rounded-2xl bg-purple-400 top-[2px]"
          animate={{
            width: mobilePillDimensions.width,
            top: mobilePillDimensions.top,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{ zIndex: 10 }}
        />
      )}

      {/* Purple circle background when closed */}
      {!isMobileMenuOpen && (
        <motion.div
          className="absolute inset-[2px] rounded-full bg-purple-400"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 10 }}
        />
      )}

      <HamburgerIcon isOpen={isMobileMenuOpen} />
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-end gap-[10px]">
              {/* Mobile menu items */}
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={section.link}
                  ref={section.mobileRef}
                  onClick={(e) => handleNavClick(index, e)}
                  className={`px-[12px] pt-[8px] min-h-[38px] w-fit rounded-2xl cursor-pointer relative z-20 transition-colors ${
                    activeSectionIndex === index
                      ? "text-white"
                      : "text-white hover:text-white"
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileNav;
