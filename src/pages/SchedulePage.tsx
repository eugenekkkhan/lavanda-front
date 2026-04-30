import { Helmet } from "react-helmet-async";
import MainLayout from "./MainLayout";

const SchedulePage = () => (
  <>
    <Helmet>
      <title>Расписание | Медицинский центр «Лаванда»</title>
      <meta
        name="description"
        content="Расписание работы специалистов медицинского центра «Лаванда». Терапевты, физиотерапевты и другие врачи."
      />
      <meta property="og:title" content="Расписание | Медицинский центр «Лаванда»" />
      <meta
        property="og:description"
        content="Расписание работы специалистов медицинского центра «Лаванда». Терапевты, физиотерапевты и другие врачи."
      />
      <link rel="canonical" href="https://lavanda-med.com/schedule" />
    </Helmet>
    <MainLayout />
  </>
);

export default SchedulePage;
