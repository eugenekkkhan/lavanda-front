import HeroSection from '../organisms/HeroSection/HeroSection'
import DoctorsPage from './DoctorsPage'
import ContactSection from '../organisms/ContactSection/ContactSection'
import ServicesPage from './ServicesPage'

const MainLayout = () => {
	return (
	<>
    <section id="home"><HeroSection /></section>
    <section id="services"><ServicesPage /></section>
    <section id="doctors"><DoctorsPage/></section>
    <section id="contacts"><ContactSection /></section>
  </>
	)
}

export default MainLayout
