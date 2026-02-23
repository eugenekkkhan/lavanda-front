import { servicesData } from './services.data'
import { useNavigate } from 'react-router'
import ServicesList from '../ServicesList/ServicesList'
const ServiceSection = () => {
	const navigate = useNavigate()
	const handleLearnMore = (serviceId: string) => {
		console.log(`Learn more about service: ${serviceId}`)
		if (serviceId) {
			navigate(`/service/${serviceId}`)
		}
	}
	return (
		<section className='w-full bg-[#BDB2FF] py-16 md:py-24 px-4'>
			<div className='max-w-[1104px] mx-auto'>
				{/* Section Header */}
				<div className='mb-12'>
					<h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
						Услуги
					</h2>
					<p className='w-full text-base md:text-lg text-white/90 leading-relaxed'>
						Медицинский центр предлагает широкий спектр услуг: консультации
						профильных специалистов для взрослых и детей, диагностику,
						процедурный кабинет, а также комплексные программы профилактики и
						лечения. Приемы ведут опытные врачи с использованием современного
						оборудования, а так же доступные услуги, такие как выезд специалиста
						на дом и оформление справок, а также дополнительные сервисы, такие
						как выезд
					</p>
				</div>

				{/* Services List */}
				<div>
					<ServicesList servicesData={servicesData} handleLearnMore={handleLearnMore}/>
				</div>
			</div>
		</section>
	)
}

export default ServiceSection
