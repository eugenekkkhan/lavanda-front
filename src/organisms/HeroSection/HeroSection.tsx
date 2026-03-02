import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ContactPill from "../../molecules/Contacts/ContactPill";
import logo from "../../assets/Logo.svg";
import Logo from "../../atoms/Logo";

const SCROLLED_TOP = 16;
const SCROLLED_LEFT = 16;
const SCROLLED_WIDTH = 80;

const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="w-full min-h-screen bg-primary text-accent flex flex-col snap-start snap-always">
      {/* Contact Pill */}
      <div className="w-full px-4 mt-[72px] md:max-w-[496px] mx-auto">
        <div className="hidden sm:block">
          <ContactPill displayAddress={false} displayText={false} />
        </div>
        <div className="block sm:hidden">
          <ContactPill displayAddress={false} displayText={false} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-[16px] md:py-[78px]">
        {/* Main Heading */}
        <div className="flex-1 flex flex-col justify-end text-center max-w-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-6/7 mb-12 md:mb-17 lg:mb-22">
            <div className="relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-accent mb-4 text-nowrap">
                Медицинский центр
              </h1>
            </div>
          </div>
          <div
            className={
              scrolled
                ? "fixed top-[22px] z-50 lg:top-4 left-4 h-[32px] lg:h-[42px] transition-all duration-500 ease-in-out !fill-[var(--color-tertiary)]"
                : "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-[calc(50%-40px)] md:-translate-y-[calc(50%-20px)] !fill-[var(--color-tertiary)] h-[90px] transition-all duration-500 ease-in-out"
            }
          >
            <Logo />
          </div>

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
