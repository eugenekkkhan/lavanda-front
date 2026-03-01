import ContactPill from "../../molecules/Contacts/ContactPill";
import logo from "../../assets/Logo.svg";

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen bg-white text-secondary flex flex-col snap-start snap-always">
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
          <div className="relative mb-55">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-secondary mb-4">
              Медицинский центр
            </h1>
            <img src={logo} className="absolute scale-125 top-1/2 left-1/4 translate-y-5 z-10"/>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-secondary/80 leading-relaxed max-w-xl mx-auto">
            Медицинский центр <span className="text-accent">«Лаванда»</span> – это место, где современное
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
