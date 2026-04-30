import { Helmet } from "react-helmet-async";
import MainLayout from "./MainLayout";

const SITE_NAME = "Медицинский центр «Лаванда»";

const HomePage = () => (
  <>
    <Helmet>
      <title>{SITE_NAME} | Консультации и диагностика</title>
      <meta
        name="description"
        content="Медицинский центр «Лаванда» — консультации специалистов, УЗИ-диагностика, физиопроцедуры и лечебные манипуляции. Современное оборудование. Индивидуальный подход к каждому пациенту."
      />
      <meta property="og:title" content={`${SITE_NAME} | Консультации и диагностика`} />
      <meta
        property="og:description"
        content="Медицинский центр «Лаванда» — консультации специалистов, УЗИ-диагностика, физиопроцедуры и лечебные манипуляции. Современное оборудование. Индивидуальный подход к каждому пациенту."
      />
      <link rel="canonical" href="https://lavanda-med.com/" />
    </Helmet>
    <MainLayout />
  </>
);

export default HomePage;
