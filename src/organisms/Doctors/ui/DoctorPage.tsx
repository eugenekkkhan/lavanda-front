import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { HiArrowLongLeft } from 'react-icons/hi2'
import IconButton from '../../../molecules/Buttons/IconButton'
import { useParams } from 'react-router'
import { currentTherapistData } from '../data/currentTherapist.data'
const DoctorPage = () => {
	const navigate = useNavigate()
	const currentId = window.location.hash.split('/')
	console.log(currentId)
	const therapist = currentTherapistData.find(
		t => t.id === currentId[currentId.length - 1],
	)
	return (
		<motion.section className='w-full bg-primary py-16 md:py-24 px-4'>
			<motion.div className='max-w-[1104px] mx-auto min-h-[800px]'>
				<div className='flex flex-col md:flex-row gap-8 md:gap-12 items-start'>
					<div className='flex-1 order-2 md:order-1'>
						<motion.div className='flex items-center gap-4 mb-6'>
							<IconButton
								icon={HiArrowLongLeft}
								className='flex-shrink-0'
								onClick={() => navigate(-1)}
							>
								Назад
							</IconButton>

							<h2 className='text-4xl md:text-5xl font-bold text-secondary leading-none'>
								{therapist?.name}
							</h2>
						</motion.div>

						<p className='w-full text-base md:text-lg text-secondary/90 leading-relaxed'>
							{therapist?.description}
						</p>
					</div>

					
					<motion.div className='w-full md:w-[196px] h-[200px] md:h-[226px] order-1 md:order-2 flex items-center flex-shrink-0 rounded-lg bg-[#b2a5fe]/40 justify-center overflow-hidden'>
						<img
							src={therapist?.icon}
							alt={therapist?.id}
							className='w-full h-full object-cover'
						/>
					</motion.div>
				</div>
			</motion.div>
		</motion.section>
	)
}

export default DoctorPage
