import { useContext, useEffect, useState } from "react";
import Logo from "../../atoms/Logo";
import { ReadinessContext } from "../../context/ReadinessContext";
import { motion } from "framer-motion";
const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { isReady, readyMap } = useContext(ReadinessContext);

  return (
    <section className="w-full min-h-screen bg-primary text-accent flex flex-col snap-start snap-always">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-[16px] md:py-[78px]">
        {/* Main Heading */}
        <div className="flex-1 flex flex-col justify-end text-center max-w-2xl">
          <div className="absolute top-[calc(50vh-40px)] left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-6/7 mb-12 md:mb-17 lg:mb-22">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-accent mb-4 text-nowrap">
              Медицинский центр
            </h1>
          </div>
          <div
            className="fixed top-0 left-0 z-50 !fill-[var(--color-tertiary)]"
            style={{
              height: "90px",
              transformOrigin: "top left",
              transform: scrolled
                ? "translate3d(16px, 22px, 0) scale(0.356)"
                : "translate3d(calc(50vw - 144px), calc(50vh - 40px), 0) scale(1)",
              transition: "transform 500ms ease-in-out",
              willChange: "transform",
            }}
          >
            <Logo />
          </div>
          <motion.div
            className={`fixed ${!isReady ? "" : "hidden"} bg-primary top-0 left-0 z-45 w-screen h-screen`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          ></motion.div>

          {/* Description */}
          <p className="text-base md:text-lg text-accent/80 leading-relaxed max-w-xl mx-auto mb-8 ml-4 mr-4">
            Медицинский центр <span className="text-tertiary">«Лаванда»</span> –
            это место, где современное оборудование, опытные специалисты и
            внимательное отношение к каждому пациенту создают комфортные условия
            для качественной диагностики и лечения
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
