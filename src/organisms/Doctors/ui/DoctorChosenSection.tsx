import { motion } from "framer-motion";
import { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link, useParams, useSearchParams } from "react-router";
import IconButton from "../../../molecules/Buttons/IconButton";
import InformationList from "../../../molecules/Lists/InformationList";
import type { DoctorListItem } from "../data/doctorsByCategory.data";
import { doctorsByCategoryData } from "../data/doctorsByCategory.data";
import { useBackNavigation } from "../../../hooks/useBackNavigation";
const DoctorChosenSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    () => searchParams.get("search") ?? "",
  );
  const { goBack } = useBackNavigation();
  const { categoryId } = useParams();
  const categoryData =
    doctorsByCategoryData[categoryId ?? ""] ?? doctorsByCategoryData.therapists;

  const createCards = (items: DoctorListItem[]) =>
    items.map((item) => (
      <Link to={`/doctors/${categoryId}/${item.id}`} key={item.id}>
        <div className="py-2 flex items-center justify-start text-lg md:text-2xl font-semibold text-secondary px-[18px]">
          <p className="">{item.title}</p>
        </div>
      </Link>
    ));

  const filteredData = categoryData.doctors.filter((doctor) =>
    doctor.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
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

  const filteredDoctorCards = createCards(filteredData);

  return (
    <motion.section className="w-full bg-primary py-[16px] md:py-[78px] px-4 snap-start snap-always">
      <motion.div className="max-w-[1104px] mx-auto min-h-[800px]">
        <div className="w-full flex items-center mt-[58px] mb-4">
          <motion.div className="">
            <motion.div className="flex items-center gap-4 mb-6">
              <IconButton
                icon={HiArrowLongLeft}
                className="flex-shrink-0"
                onClick={goBack}
              >
                Назад
              </IconButton>

              <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-none">
                {categoryData.title}
              </h2>
            </motion.div>
            <p className="w-full text-base md:text-lg text-secondary/90 leading-relaxed">
              {categoryData.description}
            </p>
          </motion.div>
        </div>

        <motion.div className="">
          <InformationList
            showSearch
            data={filteredDoctorCards}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default DoctorChosenSection;
