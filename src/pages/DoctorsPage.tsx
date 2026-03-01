import { AnimatePresence, motion } from "framer-motion"
import { useParams } from "react-router"
import { animationEssentials } from '../common/animationEssentials'
import DoctorChosenSection from '../organisms/Doctors/ui/DoctorChosenSection'
import DoctorSection from '../organisms/Doctors/ui/DoctorSection'
const DoctorsPage = () => {

	const { serviceId } = useParams()
	return (
		<AnimatePresence mode="wait">
			{serviceId ? (
				<motion.div key="detail" {...animationEssentials}>
					<DoctorChosenSection />
				</motion.div>
			) : (
				<motion.div key="list" {...animationEssentials}>
					<DoctorSection />
				</motion.div>
			)}
		</AnimatePresence>
	)

}

export default DoctorsPage
