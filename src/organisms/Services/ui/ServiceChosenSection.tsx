import { useState } from 'react'
import { motion } from 'framer-motion'
import { Service } from '../data/services.data'
import { uziData } from '../data/uzi.data'
import InformationList from './InformationList'
import IconButton from '../../../molecules/Buttons/IconButton'
import { HiArrowLongLeft } from 'react-icons/hi2'
import { useNavigate } from 'react-router'
const ServiceChosenSection = () => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const navigate = useNavigate()
	const imageURL =
		'https://media.istockphoto.com/id/1295782888/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9-%D0%BA%D0%B0%D0%B1%D0%B8%D0%BD%D0%B5%D1%82-%D0%B2%D1%80%D0%B0%D1%87%D0%B0.jpg?s=612x612&w=0&k=20&c=vDcpy2AZ2WbeOSpebSevKYssoUeBwOa_Ett6l1nb8Nk='


	const createCards = (items: Service[]) =>
		items.map(item => (
			<div className='py-2 flex items-center justify-between text-lg md:text-2xl font-semibold text-secondary px-2'>
				<p className=''>{item.title}</p>
				<p>{item.description}</p>
			</div>
		))

	const filteredData = uziData.filter((s: Service) =>
		s.title.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	const filteredServicesCards = createCards(filteredData)

	return (
		<motion.section className='w-full bg-primary'>
			<div className='relative w-full  flex items-center mt-[58px] mb-6 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity'
					style={{
						backgroundImage: `url(${imageURL})`,
						opacity: 0.3,
					}}
				/>

				<motion.div className='relative z-10 max-w-[1104px] mx-auto px-4 w-full py-9'>
					<motion.div className='flex items-center gap-4 mb-6'>
						<IconButton
							icon={HiArrowLongLeft}
							className='flex-shrink-0'
							onClick={() => navigate(-1)}
						>
							Назад
						</IconButton>

						<h2 className='text-4xl md:text-5xl font-bold text-secondary leading-none'>
							УЗИ-диагностика
						</h2>
					</motion.div>
					<p className='w-full text-base md:text-lg text-secondary/90 leading-relaxed'>
						Ультразвуковое исследование в центре позволяет точно оценить
						состояние органов брюшной полости, малого таза, щитовидной железы,
						молочных желез, почек, сосудов и суставов, включая
						специализированные процедуры для детей и беременных. Исследования
						проводятся на современном оборудовании опытными специалистами с
						выдачей подробного заключения. Доступны как базовые обследования (от
						1200 р.), так и комплексные (до 4200 р.)
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

export default ServiceChosenSection
