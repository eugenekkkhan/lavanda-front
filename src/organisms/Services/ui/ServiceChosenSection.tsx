import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useParams, useSearchParams } from "react-router";
import IconButton from "../../../molecules/Buttons/IconButton";
import InformationList from "../../../molecules/Lists/InformationList";
import {
  fetchSectionServiceEntityByDocumentId,
  fetchSubsectionsBySection,
} from "../../../api";
import type {
  SectionServiceEntity,
  SubsectionServiceEntity,
} from "../../../api/types";
import { getStrapiImageUrl } from "../../../api/utils";
import { useBackNavigation } from "../../../hooks/useBackNavigation";

const ServiceChosenSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    () => searchParams.get("search") ?? "",
  );
  const { serviceId } = useParams<{ serviceId: string }>();
  const { goBack } = useBackNavigation();

  const [section, setSection] = useState<SectionServiceEntity | null>(null);
  const [subsections, setSubsections] = useState<SubsectionServiceEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceId) return;
    Promise.all([
      fetchSectionServiceEntityByDocumentId(serviceId).then((res) =>
        setSection(res.data),
      ),
      fetchSubsectionsBySection(serviceId).then((res) =>
        setSubsections(res.data),
      ),
    ]).finally(() => setLoading(false));
  }, [serviceId]);

  const createCards = (items: SubsectionServiceEntity[]) =>
    items.map((item) => (
      <div
        key={item.documentId}
        className="py-2 flex items-center justify-between text-lg md:text-2xl font-semibold text-secondary px-[18px]"
      >
        <p>{item.title}</p>
        {item.price ? <p>{item.price} ₽</p> : null}
      </div>
    ));

  const filteredData = subsections.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set("search", value);
    } else {
      nextParams.delete("search");
    }
    setSearchParams(nextParams, { replace: true });
  };

  const backgroundImage = section?.thumbnail
    ? getStrapiImageUrl(section.thumbnail.url)
    : undefined;

  return (
    <motion.section className="w-full bg-primary pt-[78px] pb-[16px] snap-start snap-always">
      <div className="relative w-full  flex items-center mb-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : undefined,
            opacity: 0.3,
          }}
        />

        <motion.div className="relative z-10 max-w-[1104px] mx-auto px-4 w-full py-9">
          <motion.div className="flex items-center gap-4 mb-6">
            <IconButton
              icon={HiArrowLongLeft}
              className="flex-shrink-0"
              onClick={goBack}
            >
              Назад
            </IconButton>

            <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-none">
              {section?.title ?? ""}
            </h2>
          </motion.div>
          <p className="w-full text-base md:text-lg text-secondary/90 leading-relaxed">
            {section?.description ?? ""}
          </p>
        </motion.div>
      </div>

      <motion.div className="max-w-[1104px] mx-auto w-full px-4">
        {loading ? (
          <p className="text-secondary/50 px-[18px]">Загрузка...</p>
        ) : (
          <InformationList
            showSearch
            data={createCards(filteredData)}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        )}
      </motion.div>
    </motion.section>
  );
};

export default ServiceChosenSection;
