import { useContext, useEffect, useState } from "react";
import Logo from "../../atoms/Logo";
import { ReadinessContext } from "../../context/ReadinessContext";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { isReady } = useContext(ReadinessContext);
  const [opacity, setOpacity] = useState(1);
  const showInitialLogo = opacity > 0 || !scrolled;

  useEffect(() => {
    if (isReady && opacity > 0) {
      const timeout = setTimeout(() => {
        console.log("Clearing Timeout");
        setOpacity((prev) => {
          return prev - 1 / 20 > 0 ? prev - 1 / 20 : 0;
        });
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [isReady, opacity]);

  return (
    <section className="w-full min-h-screen mb-16 bg-primary text-accent flex flex-col snap-start snap-always">
      {/* Main Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-[16px] md:py-[78px]">
        {/* Main Heading */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl">
          {opacity < 1 ? (
            <p className="absolute bottom-8 md:bottom-12 left-1/2 w-full max-w-xl -translate-x-1/2 px-4 text-base md:text-lg text-center text-accent/80 leading-relaxed">
              Медицинский центр <span className="text-tertiary">«Лаванда»</span>{" "}
              – это место, где современное оборудование, опытные специалисты и
              внимательное отношение к каждому пациенту создают комфортные
              условия для качественной диагностики и лечения
            </p>
          ) : null}
          <div
            className="fixed z-55"
            style={{
              width: "260px",
              height: "160px",
              top: "50%",
              left: "50%",
              color: "var(--color-tertiary)",
              cursor: showInitialLogo ? "pointer" : "default",
              transformOrigin: "center center",
              transform: showInitialLogo
                ? "translate3d(-50%, -50%, 0) scale(1)"
                : "translate3d(-50%, -50%, 0) scale(0.96)",
              opacity: showInitialLogo ? 1 : 0,
              pointerEvents: showInitialLogo ? "auto" : "none",
              transition:
                "opacity 420ms ease, transform 320ms ease, top 500ms ease-in-out, left 500ms ease-in-out, width 500ms ease-in-out, height 500ms ease-in-out, color 100ms ease-in-out",
              willChange: "opacity, transform, width, height, top, left",
            }}
            onClick={() =>
              scroller.scrollTo("home", { duration: 500, smooth: true })
            }
          >
            <Logo />
          </div>
          <motion.div
            className={`fixed bg-primary top-0 left-0 z-50 w-screen h-[calc(100vh+400px)] overflow-hidden pointer-events-none`}
            style={{
              opacity: opacity,
              display: opacity === 0 ? "none" : "block",
              transition:
                opacity < 0.5 ? "background-color 500ms ease-in-out" : "none",
            }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
