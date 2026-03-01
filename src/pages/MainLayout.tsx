import HeroSection from '../organisms/HeroSection/HeroSection'
import DoctorsPage from './DoctorsPage'
import ContactSection from '../organisms/ContactSection/ContactSection'
import ServicesPage from './ServicesPage'
import ServiceChosenSection from '../organisms/Services/ui/ServiceChosenSection'
import DoctorPage from '../organisms/Doctors/ui/DoctorPage'
import ServiceSection from '../organisms/Services/ui/ServiceSection'
import DoctorChosenSection from '../organisms/Doctors/ui/DoctorChosenSection'
import DoctorSection from '../organisms/Doctors/ui/DoctorSection'
import { useParams } from 'react-router'

const MainLayout = () => {
	const { serviceId, categoryId, doctorId } = useParams();

  return (
    <main>
      <section id="home">
        <HeroSection />
      </section>

      <section id="services">
        {serviceId ? <ServiceChosenSection /> : <ServiceSection />}
      </section>

      <section id="doctors">
        {doctorId ? (
          <DoctorPage />
        ) : categoryId ? (
          <DoctorChosenSection />
        ) : (
          <DoctorSection />
        )}
      </section>

      <section id="contacts">
        <ContactSection />
      </section>
    </main>
  );
}

export default MainLayout
