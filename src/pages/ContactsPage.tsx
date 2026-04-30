import { Helmet } from "react-helmet-async";
import MainLayout from "./MainLayout";

const ContactsPage = () => (
  <>
    <Helmet>
      <title>Контакты | Медицинский центр «Лаванда»</title>
      <meta
        name="description"
        content="Адрес, телефон и режим работы медицинского центра «Лаванда». Свяжитесь с нами или приезжайте в удобное для вас время."
      />
      <meta property="og:title" content="Контакты | Медицинский центр «Лаванда»" />
      <meta
        property="og:description"
        content="Адрес, телефон и режим работы медицинского центра «Лаванда». Свяжитесь с нами или приезжайте в удобное для вас время."
      />
      <link rel="canonical" href="https://lavanda-med.com/contacts" />
    </Helmet>
    <MainLayout />
  </>
);

export default ContactsPage;
