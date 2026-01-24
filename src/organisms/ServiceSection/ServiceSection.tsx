import ServiceCard from "../../molecules/ServiceCard/ServiceCard";
import { servicesData } from "./services.data";

const ServiceSection = () => {
  const handleLearnMore = (serviceId: string) => {
    console.log(`Learn more about service: ${serviceId}`);
    // Add navigation or modal logic here
  };

  return (
    <section className="w-full bg-gradient-to-b from-purple-300 to-purple-400 py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Услуги
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-3xl leading-relaxed">
            Медицинский центр предлагает широкий спектр услуг: консультации
            профильных специалистов для взрослых и детей, диагностику,
            процедурный кабинет, а также комплексные программы профилактики и
            лечения. Приемы ведут опытные врачи с использованием современного
            оборудования, а так же доступные услуги, такие как выезд специалиста
            на дом и оформление справок, а также дополнительные сервисы, такие
            как выезд
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              onLearnMore={() => handleLearnMore(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
