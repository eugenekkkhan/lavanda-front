import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { HiArrowLongLeft } from "react-icons/hi2";
import IconButton from "../../../molecules/Buttons/IconButton";
import { fetchEmployeeByDocumentId } from "../../../api";
import type { Employee } from "../../../api/types";
import { getStrapiImageUrl } from "../../../api/utils";
import { useBackNavigation } from "../../../hooks/useBackNavigation";
import LoadingCircle from "../../../atoms/LoadingCircle/LoadingCircle";

const DoctorPage = () => {
  const { goBack } = useBackNavigation();
  const { doctorId } = useParams<{ categoryId: string; doctorId: string }>();

  const [doctor, setDoctor] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) return;
    fetchEmployeeByDocumentId(doctorId)
      .then((res) => setDoctor(res.data))
      .catch(() => setDoctor(null))
      .finally(() => setLoading(false));
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

  return (
    <motion.section className="w-full min-h-screen bg-primary pt-[78px] pb-[16px] px-4 snap-start snap-always">
      {" "}
      <motion.div className="max-w-[1104px] mx-auto min-h-[800px]">
        <motion.div className="flex flex-col md:flex-row gap-6 items-start mb-4">
          <motion.div className="flex-1">
            <motion.div className="flex items-center gap-4 mb-4">
              <IconButton
                icon={HiArrowLongLeft}
                className="flex-shrink-0"
                onClick={goBack}
              >
                Назад
              </IconButton>

              <h2 className="min-w-0 text-2xl sm:text-4xl md:text-5xl font-bold text-secondary">
                {doctor.fullName}
              </h2>
            </motion.div>

            {doctor.expirience ? (
              <p className="text-secondary/70 mb-2">
                Опыт: {doctor.expirience} лет
              </p>
            ) : null}
            {doctor.position ? (
              <p className="text-secondary/70 mb-2">{doctor.position}</p>
            ) : null}
            <p className="w-full text-base md:text-lg text-secondary/70">
              {doctor.description}
            </p>
          </motion.div>

          <motion.div className="w-full md:w-[196px] h-auto md:h-[226px] flex items-center justify-center flex-shrink-0 rounded-[10px] bg-[#b2a5fe]/40 overflow-hidden">
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
