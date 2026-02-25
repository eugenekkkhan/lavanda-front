import BaseCard from '../../atoms/BaseCard/BaseCard'
import type { Service } from '../../organisms/Services/data/services.data'

interface ServiceCardProps {
	item: Service
}


const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
	return <BaseCard title={item.title}></BaseCard>
}

export default ServiceCard
