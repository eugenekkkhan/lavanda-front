import { Helmet } from "react-helmet-async";
import MainLayout from "./MainLayout";

const DoctorsPage = () => (
  <>
    <Helmet>
      <title>Врачи | Медицинский центр «Лаванда»</title>
      <meta
        name="description"
        content="Опытные врачи медицинского центра «Лаванда»: терапевты, физиотерапевты и другие специалисты"
      />
      <meta property="og:title" content="Врачи | Медицинский центр «Лаванда»" />
      <meta
        property="og:description"
        content="Опытные врачи медицинского центра «Лаванда»: терапевты, физиотерапевты и другие специалисты"
      />
      <link rel="canonical" href="https://lavanda-med.com/doctors" />
    </Helmet>
    <MainLayout />
  </>
);

export default DoctorsPage;
