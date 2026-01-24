import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Section = {
  title: string;
  link: string;
  ref: React.RefObject<HTMLAnchorElement>;
};

interface DesktopNavProps {
  sections: Section[];
  activeSectionIndex: number;
  onNavClick: (index: number, e: React.MouseEvent) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  sections,
  activeSectionIndex,
  onNavClick,
}) => {
  const [pillDimensions, setPillDimensions] = useState({
    width: 0,
    left: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
    const intervalId = setInterval(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    }, 100);
    setTimeout(() => clearInterval(intervalId), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updatePillDimensions = () => {
      const activeRef = sections[activeSectionIndex]?.ref;
      if (activeRef?.current && containerRef.current) {
        const activeElement = activeRef.current;
        const containerRect = containerRef.current.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();

        setPillDimensions({
          width: elementRect.width + 20,
          left: elementRect.left - containerRect.left - 10,
        });
      }
      return { activeRef };
    };

    const { activeRef } = updatePillDimensions();
    window.addEventListener("resize", updatePillDimensions);

    return () => window.removeEventListener("resize", updatePillDimensions);
  }, [activeSectionIndex, sections, containerWidth]);

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-row gap-7 pt-[10px] px-[12px] h-10.5"
    >
      {/* Animated pill background */}
      <motion.div
        className="absolute h-[38px] rounded-2xl bg-purple-400 top-[2px]"
        animate={{
          width: pillDimensions.width,
          left: pillDimensions.left,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{ zIndex: 10 }}
      />

      {/* Nav links */}
      {sections.map((section, index) => (
        <a
          key={section.title}
          href={section.link}
          ref={section.ref}
          onClick={(e) => onNavClick(index, e)}
          className="relative z-20 transition-colors duration-200 cursor-pointer"
        >
          {section.title}
        </a>
      ))}
    </motion.div>
  );
};

export default DesktopNav;
