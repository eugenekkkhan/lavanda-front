import { motion } from "framer-motion";
import IconButton from "../../molecules/Buttons/IconButton";
import { IoMdArrowRoundUp } from "react-icons/io";
import { scroller } from "react-scroll";
import ContactPill from "../../molecules/Contacts/ContactPill";
import Logo from "../../atoms/Logo.tsx";
import { menuItems, schedule } from "./information.data.ts";
import useMobile from "../../hooks/useMobile.ts";
import useContactInfo from "../../hooks/useContactInfo";

const FooterSection = () => {
  const isMobile = useMobile();
  const { contactInfo, isLoading } = useContactInfo();
  const email = contactInfo?.email || "";
  const companyDescription = contactInfo?.companyDescription || "";
  const ogrnLine = contactInfo?.ogrnLine || "";
  const innLine = contactInfo?.innLine || "";

  let removeSnap = (timeout: number) => {
    const html = document.documentElement;
    html.style.scrollSnapType = "none";
    setTimeout(() => {
      html.style.scrollSnapType = "y mandatory";
    }, timeout);
  };

  const animation = {
    mobile: {
      initial: { opacity: 0, x: -20 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
    },
    left: {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
    },
    right: {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
    },
    center: {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
    },
  };

  return (
    <motion.section className="w-full bg-primary py-16 md:py-24 px-4 snap-start snap-always">
      <motion.div className="max-w-[1104px] min-h-[600px] mx-auto text-base text-secondary relative">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 max-w-7xl min-h-[300px]">
          <div className="lg:block hidden">
            <div className="relative">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary mb-4 text-nowrap">
                Медицинский центр
              </h1>
              <div
                className="fill-secondary absolute left-0 top-1/2 w-full
                  lg:-translate-y-2 lg:scale-70 z-10"
              >
                <Logo />
              </div>
            </div>
          </div>

          <div className="flex flex-col min-w-[170px] flex-1">
            <div className="font-semibold text-xl text-secondary mb-2">
              Информация
            </div>
            <div className="flex flex-col text-sm gap-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name + String(isMobile)}
                  {...(isMobile ? animation.mobile : animation.left)}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className="cursor-pointer hover:underline"
                    onClick={() => {
                      removeSnap(1050);
                      scroller.scrollTo(item.href, {
                        duration: item.duration,
                        delay: 0,
                        smooth: true,
                        offset: 0,
                      });
                    }}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col min-w-[200px] flex-2">
            <div className="font-semibold text-xl text-secondary mb-2">
              Часы работы
            </div>

            <div className="flex flex-col h-full text-sm gap-2">
              {schedule.map((day, index) => (
                <motion.div
                  key={day.name + String(isMobile)}
                  className="flex justify-between"
                  {...(isMobile ? animation.mobile : animation.center)}
                  transition={{ delay: index * 0.05 }}
                >
                  <span>{day.name}</span>
                  <span>{day.hours}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col min-w-[220px] flex-2">
            <div className="font-semibold text-xl text-secondary mb-2">
              Контакты
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {[
                "г. Лиски, Воронежская область, ул. Титова, д. 20, помещение XI",
                "Остановка «ТРЦ Проспект»",
                "+ 7 (980) 244-44-00",
                email,
              ].map((item, index) => (
                <motion.div
                  key={item + String(isMobile)}
                  className={
                    index === 2
                      ? "md:block hidden mt-2"
                      : index === 3
                        ? "md:block hidden"
                        : ""
                  }
                  {...(isMobile ? animation.mobile : animation.right)}
                  transition={{ delay: index * 0.1 }}
                >
                  {index === 3 && isLoading ? (
                    <div className="h-4 w-[180px] rounded bg-secondary/35 animate-pulse" />
                  ) : (
                    item || "-"
                  )}
                </motion.div>
              ))}

              <motion.div
                className="mt-4 text-xs leading-relaxed"
                {...(isMobile ? animation.mobile : animation.right)}
                transition={{ delay: 0.45 }}
              >
                {isLoading ? (
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-full rounded bg-secondary/35 animate-pulse" />
                    <div className="h-4 w-[180px] rounded bg-secondary/35 animate-pulse" />
                    <div className="h-4 w-[160px] rounded bg-secondary/35 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p>{companyDescription || "-"}</p>
                    <p>{ogrnLine || "-"}</p>
                    <p>{innLine || "-"}</p>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="flex flex-col gap-4 max-w-7xl mx-auto mt-8 pt-4 text-xs text-secondary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="border-t border-secondary w-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <div className="flex flex-row justify-between min-h-[110px]">
            <div className="lg:block hidden max-w-1/2">
              <div className="flex flex-col gap-4">
                <p>
                  Наша компания открыта для новых клиентов, мы ведем все
                  современные социальные сети и мессенджеры.
                </p>
                <p>
                  Вы можете написать нам любым удобным для вас способом -
                  телефон, почта, мессенджеры или социальные сети.
                </p>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 w-full">
              <ContactPill displayText={false} displayAddress={false} />
            </div>
          </div>

          <div className="flex flex-row justify-between text-nowrap item-center mt-5">
            <span className="text-xl md:text-2xl text-secondary">
              © lavanda-med.com, 2026
            </span>

            {/* <a href="https://lavandamed.ru/privacy.php" className="sm:w-auto">
                <TextButton
                  text="Политика конфиденциальности"
                  size="base"
                  className="!py-[10px] w-full justify-center"
                />
              </a> */}
            <div className="mr-[9px]">
              <motion.div
                animate={{
                  y: [0, -15, -5, -15, 0],
                  scale: [1, 1.1, 1.05, 1.1, 1],
                }}
                transition={{
                  delay: 2,
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <IconButton
                  icon={IoMdArrowRoundUp}
                  className="text-secondary !rounded-full !p-[8px]"
                  side="only"
                  onClick={() => {
                    removeSnap(1350);
                    scroller.scrollTo("home", {
                      duration: 1300,
                      delay: 0,
                      smooth: true,
                      offset: 0,
                    });
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default FooterSection;
