import ContactPill from "../../molecules/Contacts/ContactPill";

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen bg-[var(--color-primary)] text-[var(--color-secondary)] flex flex-col snap-start snap-always">
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
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">
        {/* Main Heading */}
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-secondary)] mb-4">
            Медицинский центр
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif italic text-[var(--color-secondary)] mb-12">
            Лаванда
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-[var(--color-secondary)]/80 leading-relaxed max-w-xl mx-auto">
            Медицинский центр «Лаванда» – это место, где современное
            оборудование, опытные специалисты и внимательное отношение к каждому
            пациенту создают комфортные условия для качественной диагностики и
            лечения
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
