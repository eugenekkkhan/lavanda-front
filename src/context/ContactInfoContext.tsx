import { createContext, useEffect, useMemo, useState } from "react";
import { fetchContact } from "../api";

interface ContactInfo {
  email: string;
  companyDescription: string;
  ogrnLine: string;
  innLine: string;
}

interface ContactInfoContextValue {
  contactInfo: ContactInfo | null;
  isLoading: boolean;
}

export const ContactInfoContext = createContext<ContactInfoContextValue>({
  contactInfo: null,
  isLoading: true,
});

interface ContactInfoProviderProps {
  children: React.ReactNode;
}

const ContactInfoProvider = ({ children }: ContactInfoProviderProps) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchContact()
      .then((response) => {
        if (!isMounted || !response?.data) return;

        const data = response.data;
        const nextContactInfo: ContactInfo = {
          email: data.adresses?.main_mail || "",
          companyDescription: data.phone_numbers?.company_description || "",
          ogrnLine: data.phone_numbers?.OGRN_line || "",
          innLine: data.phone_numbers?.INN_line || "",
        };

        setContactInfo(nextContactInfo);
      })
      .catch(() => {
        if (!isMounted) return;
        setContactInfo(null);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      contactInfo,
      isLoading,
    }),
    [contactInfo, isLoading],
  );

  return (
    <ContactInfoContext.Provider value={value}>
      {children}
    </ContactInfoContext.Provider>
  );
};

export default ContactInfoProvider;
