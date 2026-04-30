import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { doctorsData } from "../organisms/Doctors/data/doctors.data";
import { doctorProfilesByCategoryData } from "../organisms/Doctors/data/doctorProfiles.data";
import MainLayout from "./MainLayout";

const SITE_NAME = "Медицинский центр «Лаванда»";

const DoctorProfilePage = () => {
  const { categoryId, doctorId } = useParams<{ categoryId: string; doctorId: string }>();

  const profiles = categoryId ? (doctorProfilesByCategoryData[categoryId] ?? []) : [];
  const doctor = doctorId ? profiles.find((d) => d.id === doctorId) : null;
  const categoryTitle = categoryId ? (doctorsData.find((d) => d.id === categoryId)?.title ?? "") : "";

  const title = doctor ? `${doctor.name} — ${categoryTitle} | ${SITE_NAME}` : SITE_NAME;
  const description = doctor?.description ?? "";
  const canonical = `https://lavanda-med.com/doctors/${categoryId ?? ""}/${doctorId ?? ""}`;

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

export default DoctorProfilePage;
