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
      <div className="flex-1 flex flex-col items-center">
        {/* Main Heading */}
        <div className="flex-1 flex flex-col justify-end text-center max-w-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:-translate-y-6/7 mb-12 md:mb-17 lg:mb-22">
            <div className="relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-secondary mb-4 text-nowrap">
                Медицинский центр
              </h1>
              <img 
                src={logo} 
                className="absolute top-1/2 left-1/4
                  scale-70 md:scale-100 lg:scale-125
                  -translate-x-16.5 md:-translate-x-9.5 lg:-translate-x-3
                  -translate-y-1.5 md:translate-y-2.5 lg:translate-y-6 z-10"
                alt="Logo"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-black/80 leading-relaxed max-w-xl mx-auto mb-8 ml-4 mr-4">
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
