import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import InformationCard from "../../../molecules/Cards/InformationCard";
import InformationList from "../../../molecules/Lists/InformationList";
import { fetchEmployeeCategories } from "../../../api";
import type { EmployeeCategory } from "../../../api/types";
import { getStrapiImageUrl } from "../../../api/utils";
import LoadingCircle from "../../../atoms/LoadingCircle/LoadingCircle";
import { ReadinessContext } from "../../../context/ReadinessContext";

const DoctorSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<EmployeeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { setReady } = useContext(ReadinessContext);
  useEffect(() => {
    setReady("doctors", false);

    fetchEmployeeCategories()
      .then((res) => {
        if (res) {
          setCategories(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
        setReady("doctors", true);
      });
  }, []);

  const handleLearnMore = (documentId: string) => {
    if (documentId) {
      navigate(`/doctors/${documentId}`);
    }
  };

  const cards = categories.map((category) => (
    <InformationCard
      key={category.documentId}
      item={{
        id: category.documentId,
        title: category.title,
        description: category.description ?? undefined,
        icon: category.icon ? getStrapiImageUrl(category.icon.url) : undefined,
      }}
      handleLearnMore={handleLearnMore}
    />
  ));

  return (
    <motion.section className="w-full min-h-screen bg-primary pt-[78px] pb-16 px-4 snap-start snap-always">
      <motion.div className="max-w-[1104px] mx-auto min-h-full">
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

        <motion.div
          className={`${loading && "flex w-full min-h-[50vh] items-center justify-center"}`}
        >
          {loading ? <LoadingCircle /> : <InformationList data={cards} />}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default DoctorSection;
