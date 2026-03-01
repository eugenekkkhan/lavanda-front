import HeroSection from "../organisms/HeroSection/HeroSection";
import ContactSection from "../organisms/ContactSection/ContactSection";
import ServiceChosenSection from "../organisms/Services/ui/ServiceChosenSection";
import DoctorPage from "../organisms/Doctors/ui/DoctorPage";
import ServiceSection from "../organisms/Services/ui/ServiceSection";
import DoctorChosenSection from "../organisms/Doctors/ui/DoctorChosenSection";
import DoctorSection from "../organisms/Doctors/ui/DoctorSection";
import { useParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { animationEssentials } from "../common/animationEssentials";
import { useContext } from "react";
import { ComponentContext } from "../context/ComponentContext";

const MainLayout = () => {
  const { serviceId, categoryId, doctorId } = useParams();

  const componentContextValue = useContext(ComponentContext);
  console.log(componentContextValue);

  return (
    <main>
      <section id="home">
        <HeroSection />
      </section>

      <section id="services">
        <AnimatePresence mode="wait">
          {serviceId ? (
            <motion.div key="detail" {...animationEssentials}>
              <ServiceChosenSection />
            </motion.div>
          ) : (
            <motion.div key="list" {...animationEssentials}>
              <ServiceSection />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="doctors">
        <AnimatePresence mode="wait">
          {doctorId ? (
            <motion.div key="doctor-profile" {...animationEssentials}>
              <DoctorPage />
            </motion.div>
          ) : categoryId ? (
            <motion.div key="category-list" {...animationEssentials}>
              <DoctorChosenSection />
            </motion.div>
          ) : (
            <motion.div key="doctors-main" {...animationEssentials}>
              <DoctorSection />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="contacts">
        <ContactSection />
      </section>
    </main>
  );
};

export default MainLayout;
