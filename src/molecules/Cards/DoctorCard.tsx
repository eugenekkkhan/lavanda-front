import BaseCard from './BasicCard'
import type { Service } from '../../organisms/ServiceSection/services.data'

interface DoctorCardProps {
	doctor: Service
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
	return <BaseCard title={doctor.title}></BaseCard>
}

export default DoctorCard
