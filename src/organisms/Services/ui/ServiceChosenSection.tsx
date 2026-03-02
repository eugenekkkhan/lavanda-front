import { motion } from "framer-motion";
import { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useParams, useSearchParams } from "react-router";
import IconButton from "../../../molecules/Buttons/IconButton";
import InformationList from "../../../molecules/Lists/InformationList";
import { Service } from "../data/services.data";
import { serviceDetailsData } from "../data/serviceDetails.data";
import { useBackNavigation } from "../../../hooks/useBackNavigation";
const ServiceChosenSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    () => searchParams.get("search") ?? "",
  );
  const { serviceId } = useParams<{ serviceId: string }>();
  const { goBack } = useBackNavigation();
  const selectedService =
    serviceDetailsData[serviceId ?? ""] ?? serviceDetailsData.uzd;

  const createCards = (items: Service[]) =>
    items.map((item) => (
      <div className="py-2 flex items-center justify-between text-lg md:text-2xl font-semibold text-secondary px-[18px]">
        <p className="">{item.title}</p>
        <p>{item.description}</p>
      </div>
    ));

  const filteredData = selectedService.items.filter((s: Service) =>
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

  const filteredServicesCards = createCards(filteredData);

  return (
    <motion.section className="w-full bg-primary pt-[78px] snap-start snap-always">
      <div className="relative w-full  flex items-center mb-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity"
          style={{
            backgroundImage: `url(${selectedService.imageURL})`,
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
              {selectedService.title}
            </h2>
          </motion.div>
          <p className="w-full text-base md:text-lg text-secondary/90 leading-relaxed">
            {selectedService.description}
          </p>
        </motion.div>
      </div>

      <motion.div className="max-w-[1104px] mx-auto w-full px-4">
        <InformationList
          showSearch
          data={filteredServicesCards}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </motion.div>
    </motion.section>
  );
};

export default ServiceChosenSection;
