import TextButton from '../Buttons/TextButton'


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
		<div className='flex gap-4 p-3'>
			{/* Image placeholder */}
			<div className='w-[196px] h-[226px] flex-shrink-0 rounded-lg bg-[#b2a5fe]/40 flex items-center m-auto justify-center overflow-hidden'>
				<img src='' alt='photo' className='w-full h-full object-cover ' />
			</div>

			{/* Content */}
			<div className='flex-1 flex flex-col justify-between '>
				<div className='mb-3'>
					<h3 className='text-lg md:text-2xl font-semibold text-white mb-2'>
						{title}
					</h3>
					<p className='text-sm md:text-base text-white/90 leading-relaxed'>
						{description}
					</p>
				</div>
				{/* Learn more button */}
				<TextButton  text='Подробнее' className='mb-3' onClick={onLearnMore}/>
					
				
			</div>
		</div>
	)
}

export default ServiceCard
