import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { HiArrowLongLeft } from 'react-icons/hi2'
import IconButton from '../../../molecules/Buttons/IconButton'
import { currentTherapistData } from '../data/currentTherapist.data'
const DoctorPage = () => {
	const navigate = useNavigate()
	const currentId = window.location.hash.split('/')
	console.log(currentId)
	const therapist = currentTherapistData.find(
		t => t.id === currentId[currentId.length - 1],
	)

	if (!therapist) {
		return (
			<motion.div className='max-w-[1104px] mx-auto min-h-[800px] flex flex-col py-4'>
				<div className='flex justify-start'>
					<IconButton
						icon={HiArrowLongLeft}
						className='flex-shrink-0'
						onClick={() => navigate(-1)}
					>
						Назад
					</IconButton>
				</div>

				<div className='flex-1 flex items-center justify-center'>
					<h2 className='text-5xl font-bold text-secondary text-center'>
						Данных нет
					</h2>
				</div>
			</motion.div>
		)
	}
	return (
		<motion.section className='w-full bg-primary'>
			<motion.div className='max-w-[1104px] mx-auto min-h-[800px]'>
				<motion.div className='flex flex-col md:flex-row items-start mb-4'>
					<motion.div className='flex-1'>
						<motion.div className='flex items-center gap-4 mb-4'>
							<IconButton
								icon={HiArrowLongLeft}
								className='flex-shrink-0'
								onClick={() => navigate(-1)}
							>
								Назад
							</IconButton>

							<h2 className='text-4xl md:text-5xl font-bold text-secondary'>
								{therapist?.name}
							</h2>
						</motion.div>

						<p className='w-full text-base md:text-lg text-secondary/70'>
							{therapist?.description}
						</p>
					</motion.div>

					<motion.div className='w-full md:w-[196px] h-[200px] md:h-[226px] flex items-center justify-center flex-shrink-0 rounded-lg bg-[#b2a5fe]/40 overflow-hidden'>
						<img
							src={therapist?.icon}
							alt={therapist?.id}
							className='w-full h-full object-cover'
						/>
					</motion.div>
				</motion.div>
				<motion.div className=''>
					<h3 className='font-bold text-secondary/70'>
						Предоставляемые услуги:
					</h3>
					<ul className='list-disc ml-6 text-secondary/70'>
						{therapist?.services.map((item: string, index: number) => {
							return (
								<li key={index} className='leading-normal'>
									{item}
								</li>
							)
						})}
					</ul>
				</motion.div>
			</motion.div>
		</motion.section>
	)
}

export default DoctorPage
