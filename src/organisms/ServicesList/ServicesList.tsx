import ServiceCard from '../../molecules/ServiceCard/ServiceCard'
import type { Service } from '../ServiceSection/services.data'
import SearchInput from '../../atoms/SearchInput/SearchInput'
import { useState, useMemo } from 'react'
interface ServicesListProps {
	servicesData: Service[]
	handleLearnMore?: (serviceId: string) => void
	showSearch?: boolean
}

const ServicesList = ({
	servicesData,
	handleLearnMore,
	showSearch = false,
}: ServicesListProps) => {
	const [query, setQuery] = useState('')
	const filteredData = useMemo(() => {
		return servicesData.filter(item =>
			item.title.toLowerCase().includes(query.toLowerCase()),
		)
	}, [servicesData, query])
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
						//key={service.id}
						title={service.title}
						image={service.icon}
						description={service.description}
						onLearnMore={
							handleLearnMore ? () => handleLearnMore(service.id) : undefined
						}
					/>
				</div>
			))}
		</div>
	)
}

export default ServicesList
