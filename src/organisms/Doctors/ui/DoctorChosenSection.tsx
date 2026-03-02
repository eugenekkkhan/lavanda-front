import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link, useParams, useSearchParams } from "react-router";
import IconButton from "../../../molecules/Buttons/IconButton";
import InformationList from "../../../molecules/Lists/InformationList";
import {
  fetchEmployeesByCategory,
  fetchEmployeeCategories,
} from "../../../api";
import type { Employee, EmployeeCategory } from "../../../api/types";
import { getStrapiImageUrl } from "../../../api/utils";
import { useBackNavigation } from "../../../hooks/useBackNavigation";

const DoctorChosenSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    () => searchParams.get("search") ?? "",
  );
  const { goBack } = useBackNavigation();
  const { categoryId } = useParams<{ categoryId: string }>();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [category, setCategory] = useState<EmployeeCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;
    Promise.all([
      fetchEmployeeCategories().then((res) => {
        if (res) {
          const found =
            res.data.find((c) => c.documentId === categoryId) ?? null;
          setCategory(found);
        }
      }),
      fetchEmployeesByCategory(categoryId).then((res) =>
        setEmployees(res.data),
      ),
    ]).finally(() => setLoading(false));
  }, [categoryId]);

  const createCards = (items: Employee[]) =>
    items.map((item) => {
      const photoUrl = item.photo
        ? getStrapiImageUrl(item.photo.url)
        : undefined;
      return (
        <Link
          to={`/doctors/${categoryId}/${item.documentId}`}
          key={item.documentId}
        >
          <div className="py-2 flex items-center justify-start gap-3 text-lg md:text-2xl font-semibold text-secondary px-[18px]">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--color-accent)]/30 flex-shrink-0">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={item.fullName}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <p>{item.fullName}</p>
          </div>
        </Link>
      );
    });

  const filteredData = employees.filter((e) =>
    e.fullName.toLowerCase().includes(searchQuery.trim().toLowerCase()),
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

  return (
    <motion.section className="w-full bg-primary pt-[78px] pb-[16px] px-4 snap-start snap-always">
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
                {category?.title ?? ""}
              </h2>
            </motion.div>
            <p className="w-full text-base md:text-lg text-secondary/90 leading-relaxed">
              {category?.description ?? ""}
            </p>
          </motion.div>
        </div>

        <motion.div className="">
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
      </motion.div>
    </motion.section>
  );
};

export default DoctorChosenSection;
