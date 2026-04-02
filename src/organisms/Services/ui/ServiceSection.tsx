import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import InformationCard from "../../../molecules/Cards/InformationCard";
import InformationList from "../../../molecules/Lists/InformationList";
import { fetchSectionServiceEntities } from "../../../api";
import type { SectionServiceEntity } from "../../../api/types";
import { getStrapiImageUrl } from "../../../api/utils";
import { ReadinessContext } from "../../../context/ReadinessContext";

const ServiceSection = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<SectionServiceEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const { setReady } = useContext(ReadinessContext);
  useEffect(() => {
    setReady("services", false);
    fetchSectionServiceEntities()
      .then((res) => {
        setSections(res.data);
      })
      .finally(() => {
        setLoading(false);
        setReady("services", true);
      });
  }, []);

  const handleLearnMore = (documentId: string) => {
    if (documentId) {
      navigate(`/services/${documentId}`);
    }
  };

  const cards = sections.map((section) => (
    <InformationCard
      key={section.documentId}
      item={{
        id: section.documentId,
        title: section.title,
        description: section.description ?? undefined,
        icon: section.thumbnail
          ? getStrapiImageUrl(section.thumbnail.url)
          : undefined,
      }}
      handleLearnMore={handleLearnMore}
    />
  ));

  return (
    <motion.section className="w-full min-h-screen bg-primary pt-[78px] pb-[16px] px-4 snap-start snap-always">
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
          {loading ? (
            <p className="text-secondary/50">Загрузка...</p>
          ) : (
            <InformationList data={cards} />
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ServiceSection;
