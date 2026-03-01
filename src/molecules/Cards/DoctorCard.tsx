import BaseCard from "../../atoms/BaseCard/BaseCard";
import type { Service } from "../../organisms/Services/data/services.data";

interface DoctorCardProps {
  doctor: Service;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return <BaseCard title={doctor.title} />;
};

export default DoctorCard;
