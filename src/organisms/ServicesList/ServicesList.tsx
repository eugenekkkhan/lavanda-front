import ServiceCard from '../../molecules/ServiceCard/ServiceCard'
import type { Service } from '../ServiceSection/services.data'
import SearchInput from '../../atoms/SearchInput/SearchInput'
interface ServicesListProps {
	servicesData: Service[]
	handleLearnMore: (serviceId: string) => void
	showSearch?: boolean
}

const ServicesList = ({ servicesData , handleLearnMore , showSearch = true}: ServicesListProps) => {
	return (
		<div className='space-y-4 border-[1px] border-white rounded-3xl '>
			{showSearch && (<SearchInput/>)}

			{servicesData.map(service => (
				<ServiceCard
					key={service.id}
					title={service.title}
					description={service.description}
					onLearnMore={() => handleLearnMore(service.id)}
				/>
			))}
		</div>
	)
}

export default ServicesList
