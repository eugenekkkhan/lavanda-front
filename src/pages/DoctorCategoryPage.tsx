import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { doctorsData } from "../organisms/Doctors/data/doctors.data";
import MainLayout from "./MainLayout";

const SITE_NAME = "Медицинский центр «Лаванда»";

const categoryDescriptions: Record<string, string> = {
  therapists:
    "Врачи-терапевты центра «Лаванда»: диагностика острых и хронических заболеваний, консультации взрослых пациентов, разработка индивидуального плана лечения.",
  physiotherapists:
    "Физиотерапевты центра «Лаванда»: лазеротерапия, магнитотерапия, ударно-волновая терапия. Восстановление после травм, лечение болевых синдромов.",
  anyone_else:
    "Специалисты медицинского центра «Лаванда»: консультации по смежным направлениям, комплексная диагностика и персональное сопровождение лечения.",
};

const DoctorCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? doctorsData.find((d) => d.id === categoryId) : null;

  const title = category ? `${category.title} | ${SITE_NAME}` : SITE_NAME;
  const description = (categoryId ? categoryDescriptions[categoryId] : null) ?? "";
  const canonical = `https://lavanda-med.com/doctors/${categoryId ?? ""}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <MainLayout />
    </>
  );
};

export default DoctorCategoryPage;
