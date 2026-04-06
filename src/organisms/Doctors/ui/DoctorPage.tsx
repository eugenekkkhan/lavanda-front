import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { HiArrowLongLeft } from "react-icons/hi2";
import IconButton from "../../../molecules/Buttons/IconButton";
import { fetchEmployeeByDocumentId } from "../../../api";
import type { Employee } from "../../../api/types";
import { getStrapiImageUrl } from "../../../api/utils";
import { useBackNavigation } from "../../../hooks/useBackNavigation";
import LoadingCircle from "../../../atoms/LoadingCircle/LoadingCircle";
import { ReadinessContext } from "../../../context/ReadinessContext";

const DoctorPage = () => {
  const { goBack } = useBackNavigation();
  const { doctorId } = useParams<{ categoryId: string; doctorId: string }>();

  const [doctor, setDoctor] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const { setReady } = useContext(ReadinessContext);

  useEffect(() => {
    if (!doctorId) return;
    setReady("doctors", false);
    fetchEmployeeByDocumentId(doctorId)
      .then((res) => setDoctor(res.data))
      .catch(() => setDoctor(null))
      .finally(() => {
        setLoading(false);
        setReady("doctors", true);
      });
  }, [doctorId]);

  if (loading) {
    return (
      <motion.div className="max-w-[1104px] pt-[78px] mx-auto min-h-screen flex flex-col px-4 snap-start snap-always">
        <div className="flex justify-start">
          <IconButton
            icon={HiArrowLongLeft}
            className="flex-shrink-0"
            onClick={goBack}
          >
            Назад
          </IconButton>
        </div>
        <motion.div
          className={`${loading && "flex w-full min-h-[50vh] items-center justify-center"}`}
        >
          <LoadingCircle />
        </motion.div>
      </motion.div>
    );
  }

  if (!doctor) {
    return (
      <motion.div className="max-w-[1104px] pt-[78px] mx-auto min-h-screen flex flex-col px-4 snap-start snap-always ">
        <div className="flex justify-start">
          <IconButton
            icon={HiArrowLongLeft}
            className="flex-shrink-0"
            onClick={goBack}
          >
            Назад
          </IconButton>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-5xl font-bold text-secondary/70 text-center">
            Данных нет
          </h2>
        </div>
      </motion.div>
    );
  }

  const photoUrl = doctor.photo
    ? getStrapiImageUrl(doctor.photo.url)
    : undefined;
  const hasDescription = Boolean(doctor.description?.trim());
  const noDescriptionMinHeightClass =
    "min-h-[calc(100vh-78px-64px-72px)]";

  return (
    <motion.section className="w-full relative min-h-screen bg-primary pt-[78px] pb-16 px-4 snap-start snap-always">
      {" "}
      {!hasDescription ? (
        <motion.div className="absolute top-[88px] left-0 right-0 z-40 px-4 pointer-events-none">
          <div
            className="max-w-[1104px] mx-auto pointer-events-auto"
          >
            <IconButton
              icon={HiArrowLongLeft}
              className="flex-shrink-0"
              onClick={goBack}
            >
              Назад
            </IconButton>
          </div>
        </motion.div>
      ) : null}
      <motion.div
        className={`max-w-[1104px] mx-auto ${hasDescription ? "min-h-[800px]" : `${noDescriptionMinHeightClass} flex items-center justify-center`}`}
      >
        <motion.div
          className={`flex flex-col md:flex-row gap-6 ${hasDescription ? "items-start mb-4" : "items-center justify-center pt-18 md:pt-0"}`}
        >
          <motion.div className="flex-1">
            <motion.div
              className={`flex gap-4 mb-4 ${hasDescription ? "items-center" : "items-center justify-center"}`}
            >
              {hasDescription ? (
                <IconButton
                  icon={HiArrowLongLeft}
                  className="flex-shrink-0"
                  onClick={goBack}
                >
                  Назад
                </IconButton>
              ) : null}

              <h2 className="min-w-0 text-2xl sm:text-4xl md:text-5xl font-bold text-secondary">
                {doctor.fullName}
              </h2>
            </motion.div>

            {doctor.expirience ? (
              <p className="text-secondary/70 mb-2">
                Опыт: {doctor.expirience}{" "}
                {doctor.expirience === 1
                  ? "год"
                  : doctor.expirience && doctor.expirience < 5
                    ? "года"
                    : "лет"}
              </p>
            ) : null}
            {doctor.position ? (
              <p className="text-secondary/70 mb-2">{doctor.position}</p>
            ) : null}
            {hasDescription ? (
              <p className="w-full text-base md:text-lg text-secondary/70">
                {doctor.description}
              </p>
            ) : null}
          </motion.div>
          <motion.div
            className={`w-full ${hasDescription ? "md:w-[196px] md:h-[226px]" : "md:w-[260px] min-h-[226px]"} h-auto flex items-center justify-center shrink-0 rounded-[10px] bg-[#b2a5fe]/40 overflow-hidden`}
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={doctor.fullName}
                className="w-full h-full object-cover"
              />
            ) : null}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default DoctorPage;
