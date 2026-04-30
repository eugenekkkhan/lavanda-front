import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { serviceDetailsData } from "../organisms/Services/data/serviceDetails.data";
import MainLayout from "./MainLayout";

const SITE_NAME = "Медицинский центр «Лаванда»";

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? serviceDetailsData[serviceId] : null;

  const title = service ? `${service.title} | ${SITE_NAME}` : SITE_NAME;
  const description = service?.description ?? "";
  const canonical = `https://lavanda-med.com/services/${serviceId ?? ""}`;

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

export default ServiceDetailPage;
