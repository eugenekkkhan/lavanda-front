import BaseCard from '../../atoms/BaseCard/BaseCard'
import type { Service } from '../../organisms/Services/data/services.data'
import TextButton from '../Buttons/TextButton'

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
			actions={
				handleLearnMore && (
					<TextButton
						text='Подробнее'
						className='my-3 w-full md:w-auto'
						onClick={() => handleLearnMore(item.id)}
					/>
				)
			}
		></BaseCard>
	)
}

export default InformationCard
