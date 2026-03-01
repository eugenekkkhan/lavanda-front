import React, { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-scroll"

type Section = {
  title: string
  link: string
  mobileRef: React.RefObject<HTMLAnchorElement>
}

interface MobileNavProps {
  sections: Section[]
  activeSectionIndex: number
  onSetActive: (sectionLink: string) => void
  onNavigate?: () => void
}

const MobileNav: React.FC<MobileNavProps> = ({
  sections,
  activeSectionIndex,
  onSetActive,
  onNavigate,
}) => {
  const ITEM_HEIGHT = 30
  const GAP = 10
  const BUTTON_HEIGHT = 38
  const EXTRA_PADDING = 12

  const menuHeight = BUTTON_HEIGHT +
    sections.length * ITEM_HEIGHT +
    (sections.length - 1) * GAP +
    EXTRA_PADDING



  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobilePillDimensions, setMobilePillDimensions] = useState({
    width: 0,
    top: 0,
  })
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    if (mobileContainerRef.current && isMobileMenuOpen) {
      setContainerHeight(
        mobileContainerRef.current.getBoundingClientRect().height,
      )
    }
    const intervalId = setInterval(() => {
      if (mobileContainerRef.current && isMobileMenuOpen) {
        setContainerHeight(
          mobileContainerRef.current.getBoundingClientRect().height,
        )
      }
    }, 100)
    setTimeout(() => clearInterval(intervalId), 1000)
    return () => clearInterval(intervalId)
  }, [isMobileMenuOpen])



  useEffect(() => {
    const updateMobilePillDimensions = () => {
      const activeRef = sections[activeSectionIndex]?.mobileRef
      if (activeRef?.current && mobileContainerRef.current) {
        const activeElement = activeRef.current
        const containerRect =
          mobileContainerRef.current.getBoundingClientRect()
        const elementRect = activeElement.getBoundingClientRect()

        setMobilePillDimensions({
          width: elementRect.width + 22,
          top: elementRect.top - containerRect.top - 8,
        })
      }
    }

    updateMobilePillDimensions()
    window.addEventListener("resize", updateMobilePillDimensions)

    return () =>
      window.removeEventListener("resize", updateMobilePillDimensions)
  }, [activeSectionIndex, sections, containerHeight, isMobileMenuOpen])

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    onNavigate?.()
  }

  const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="min-h-[38px] min-w-[38px] rounded-full relative z-30"
      aria-label="Toggle menu"
    >
      <motion.span
        className="w-[22px] h-0.5 bg-[var(--color-secondary)] absolute left-[8px]"
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
        className="w-[22px] h-0.5 bg-[var(--color-secondary)] absolute left-[8px]"
        animate={{ opacity: isOpen ? 0 : 1, top: "18px" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      ></motion.span>
      <motion.span
        className="w-[22px] h-0.5 bg-[var(--color-secondary)] absolute left-[8px]"
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
  )

  return (
    <motion.div
      ref={mobileContainerRef}
      className="flex flex-col items-end justify-between p-[2px] overflow-hidden"
      initial={false}
      animate={{
        width: isMobileMenuOpen ? 129 : 42,
        height: isMobileMenuOpen ? menuHeight : 42,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Mobile pill background */}
      {isMobileMenuOpen && (
        <motion.div
          className="absolute h-[38px] rounded-2xl bg-[var(--color-primary)] right-[2px]"
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
          className="absolute inset-[2px] rounded-full bg-[var(--color-primary)]"
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
            className="mt-[-10px]"
          >
            <div className="flex flex-col items-end gap-[10px] mb-0.5">
              {/* Mobile menu items */}
              {sections.map((section) => (
                <Link
                  key={section.title}
                  to={section.link}
                  spy={true}
                  smooth={true}
                  duration={800}
                  offset={0}
                  onSetActive={onSetActive}
                  onClick={handleLinkClick}
                  className={`px-[12px] min-h-[30px] w-fit rounded-2xl cursor-pointer relative z-20 transition-colors text-[var(--color-secondary)]`}
                >
                  <span ref={section.mobileRef}>{section.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default MobileNav
