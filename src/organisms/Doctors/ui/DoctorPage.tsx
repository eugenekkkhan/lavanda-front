import { motion } from "framer-motion";
import { useParams } from "react-router";
import { HiArrowLongLeft } from "react-icons/hi2";
import IconButton from "../../../molecules/Buttons/IconButton";
import { currentTherapistData } from "../data/currentTherapist.data";
import { useBackNavigation } from "../../../hooks/useBackNavigation";
const DoctorPage = () => {
  const { goBack } = useBackNavigation();
  const { doctorId } = useParams<{ doctorId: string }>();

  const therapist = currentTherapistData.find((t) => t.id === doctorId);

  if (!therapist) {
    return (
      <motion.div className="max-w-[1104px] py-16 md:py-24 mx-auto min-h-[1000px] flex flex-col py-4 px-4 snap-start snap-always ">
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
  return (
    <motion.section className="w-full bg-primary py-16 md:py-24 px-4 snap-start snap-always">
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

              <h2 className="text-4xl md:text-5xl font-bold text-secondary">
                {therapist?.name}
              </h2>
            </motion.div>

            <p className="w-full text-base md:text-lg text-secondary/70">
              {therapist?.description}
            </p>
          </motion.div>

          <motion.div className="w-full md:w-[196px] h-[200px] md:h-[226px] flex items-center justify-center flex-shrink-0 rounded-[10px] bg-[#b2a5fe]/40 overflow-hidden">
            <img
              src={therapist?.icon}
              alt={therapist?.id}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
        <motion.div className="">
          <h3 className="font-bold text-secondary/70">
            Предоставляемые услуги:
          </h3>
          <ul className="list-disc ml-6 text-secondary/70">
            {therapist?.services.map((item: string, index: number) => {
              return (
                <li key={index} className="leading-normal">
                  {item}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default DoctorPage;
