import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiArrowLongLeft } from 'react-icons/hi2'
import { useNavigate } from 'react-router'
import IconButton from '../../../molecules/Buttons/IconButton'
import InformationList from '../../../molecules/Lists/InformationList'
import type { Service } from '../../Services/data/services.data'
import { therapistsData } from '../data/therapists.data'

const DoctorChosenSection = () => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const navigate = useNavigate()

	const createCards = (items: Service[]) =>
		items.map(item => (
			<div className='py-2 flex items-center justify-start text-lg md:text-2xl font-semibold text-secondary px-2'>
				<p className=''>{item.title}</p>
			</div>
		))

	const filteredData = therapistsData.filter((s: Service) =>
		s.title.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	const filteredServicesCards = createCards(filteredData)

	return (
		<motion.section className='w-full bg-primary'>
			<div className='relative w-full  flex items-center mt-[58px]  mb-4 overflow-hidden'>
				<motion.div className='relative z-10 max-w-[1104px] mx-auto px-4 w-full '>
					<motion.div className='flex items-center gap-4 mb-6'>
						<IconButton
							icon={HiArrowLongLeft}
							className='flex-shrink-0'
							onClick={() => navigate(-1)}
						>
							Назад
						</IconButton>

						<h2 className='text-4xl md:text-5xl font-bold text-secondary leading-none'>
							Терапевты
						</h2>
					</motion.div>
					<p className='w-full text-base md:text-lg text-secondary/90 leading-relaxed'>
						Какой-то текст про терапевтов.
					</p>
				</motion.div>
			</div>

			<motion.div className='max-w-[1104px] mx-auto w-full'>
				<InformationList
					showSearch
					data={filteredServicesCards}
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
				/>
			</motion.div>
		</motion.section>
	)
}

export default DoctorChosenSection
