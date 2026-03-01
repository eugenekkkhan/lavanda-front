import { motion } from "framer-motion";
import InformationCard from "../../../molecules/Cards/InformationCard";
import InformationList from "../../../molecules/Lists/InformationList";
import type { Service } from "../../Services/data/services.data";
import { doctorsData } from "../data/doctors.data";
import { useNavigate } from 'react-router';

const DoctorSection = () => {
  const navigate = useNavigate()
  const handleLearnMore = (serviceId: string) => {
    if (serviceId) {
      navigate(`/doctors/${serviceId}`)
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
        <motion.div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Врачи
          </h2>
          <p className="w-full text-base md:text-lg text-secondary/90 leading-relaxed">
            В медицинском центре работают высококвалифицированные специалисты с
            большим опытом, включая кандидатов медицинских наук (к.м.н.),
            которые регулярно проходят повышение квалификации и применяют
            современные методы диагностики и лечения. Команда врачей сочетает
            глубокие профессиональные знания с индивидуальным подходом к каждому
            пациенту, обеспечивая точную диагностику и эффективную терапию.
          </p>
        </motion.div>

        <motion.div>
          <InformationList data={createCards(doctorsData)} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default DoctorSection;
