import { Helmet } from "react-helmet-async";
import MainLayout from "./MainLayout";

const ServicesPage = () => (
  <>
    <Helmet>
      <title>Услуги | Медицинский центр «Лаванда»</title>
      <meta
        name="description"
        content="Полный спектр медицинских услуг: УЗИ-диагностика, физиопроцедуры, процедурный кабинет, гинекология, консультации врачей. Опытные специалисты и современное оборудование."
      />
      <meta property="og:title" content="Услуги | Медицинский центр «Лаванда»" />
      <meta
        property="og:description"
        content="Полный спектр медицинских услуг: УЗИ-диагностика, физиопроцедуры, процедурный кабинет, гинекология, консультации врачей. Опытные специалисты и современное оборудование."
      />
      <link rel="canonical" href="https://lavanda-med.com/services" />
    </Helmet>
    <MainLayout />
  </>
);

export default ServicesPage;
