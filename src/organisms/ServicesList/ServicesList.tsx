import ServiceCard from '../../molecules/ServiceCard/ServiceCard'
import type { Service } from '../ServiceSection/services.data'
import SearchInput from '../../atoms/SearchInput/SearchInput'
import { useState } from 'react'
interface ServicesListProps {
	servicesData: Service[]
	handleLearnMore: (serviceId: string) => void
	showSearch?: boolean
}

const ServicesList = ({
	servicesData,
	handleLearnMore,
	showSearch = true,
}: ServicesListProps) => {
	const [query, setQuery] = useState('')
	const filteredData = servicesData.filter(item => {
		return item.title.toLowerCase().includes(query.toLowerCase())
	})
	return (
		<div className='border-[1px] border-white rounded-3xl '>
			{showSearch && (
				<SearchInput
					value={query}
					onChange={setQuery}
					onClear={() => setQuery('')}
				/>
			)}

			{filteredData.map(service => (
				<div
					key={service.id}
					className='border-b-[1px] last:border-b-0 border-white mx-[11px]'
				>
					<ServiceCard
						key={service.id}
						title={service.title}
						description={service.description}
						onLearnMore={() => handleLearnMore(service.id)}
					/>
				</div>
			))}
		</div>
	)
}

export default ServicesList
