import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import InformationCard from "../../../molecules/Cards/InformationCard";
import InformationList from "../../../molecules/Lists/InformationList";
import type { Service } from "../data/services.data";
import { servicesData } from "../data/services.data";

const ServiceSection = () => {
  //const [data, setData] = useState<Service[] | []>([])

  const navigate = useNavigate();
  const handleLearnMore = (serviceId: string) => {
    console.log(`Learn more about service: ${serviceId}`);
    if (serviceId) {
      window.location.hash = `services/${serviceId}`;
    }
  };
  const createCards = (items: Service[]) =>
    items.map((item) => (
      <InformationCard
        key={item.id}
        item={item}
        handleLearnMore={handleLearnMore}
      />
    ));

  return (
    <motion.section className="w-full bg-primary py-16 md:py-24 px-4 snap-start snap-always">
      <motion.div className="max-w-[1104px] mx-auto">
        {/* Section Header */}
        <motion.div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Услуги
          </h2>
          <p className="w-full text-base md:text-lg text-secondary/90 leading-relaxed">
            Медицинский центр предлагает широкий спектр услуг: консультации
            профильных специалистов для взрослых и детей, современные методы
            диагностики, УЗИ-исследования, физиопроцедуры, лечебные манипуляции
            и процедуры в процедурном кабинете, а также комплексные программы
            профилактики и лечения.
          </p>
        </motion.div>

        {/* Services List */}
        <motion.div>
          <InformationList data={createCards(servicesData)} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ServiceSection;
