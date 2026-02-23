import BaseCard from './BasicCard'
import type { Service } from '../../organisms/ServiceSection/services.data'

interface InformationCardProps {
	item: Service
	handleLearnMore: (id: string) => void
}

const InformationCard: React.FC<InformationCardProps> = ({
	item,
	handleLearnMore,
}) => {
	return (
		<BaseCard
			title={item.title}
			description={item.description}
			image={item.icon}
			onLearnMore={handleLearnMore ? () => handleLearnMore(item.id) : undefined}
		></BaseCard>
	)
}

export default InformationCard
