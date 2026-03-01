import { AnimatePresence, motion } from 'motion/react'
import { useParams } from 'react-router'
import { animationEssentials } from '../common/animationEssentials'
import ServiceChosenSection from '../organisms/Services/ui/ServiceChosenSection'
import ServiceSection from '../organisms/Services/ui/ServiceSection'

const ServicesPage = () => {
	const { serviceId } = useParams()
	return (
		<AnimatePresence mode="wait">
			{serviceId ? (
				<motion.div key="detail" {...animationEssentials}>
					<ServiceChosenSection />
				</motion.div>
			) : (
				<motion.div key="list" {...animationEssentials}>
					<ServiceSection />
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default ServicesPage
