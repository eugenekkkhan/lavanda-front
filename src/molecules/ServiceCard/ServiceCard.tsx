import ButtonWithArrow from '../Buttons/ButtonWithArrow'
import image from '../../assets/image.png'
interface ServiceCardProps {
	title: string
	description?: string
	onLearnMore?: () => void
  
}

const ServiceCard: React.FC<ServiceCardProps> = ({
	title,
	description,
	onLearnMore,
}) => {
	return (
		<div className='flex gap-4 p-4'>
			{/* Image placeholder */}
			<div className='w-49 h-51  flex-shrink-0 rounded-lg bg-[#BDB2FF]/40 flex items-center justify-center overflow-hidden'>
				<img src={image} alt='photo' className='w-full h-full object-cover ' />
			</div>

			{/* Content */}
			<div className='flex-1 flex flex-col justify-between'>
				<div className=''>
					<h3 className='text-lg md:text-2xl font-semibold text-white mb-2'>
						{title}
					</h3>
					<p className='text-sm md:text-base text-white/90 leading-relaxed'>
						{description}
					</p>
				</div>

        

				{/* Learn more button */}
				<ButtonWithArrow className='' onClick={onLearnMore}>
					Подробнее
				</ButtonWithArrow>
			</div>
		</div>
	)
}

export default ServiceCard
