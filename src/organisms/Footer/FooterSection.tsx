import { motion } from "framer-motion";
import TextButton from "../../molecules/Buttons/TextButton";
import IconButton from "../../molecules/Buttons/IconButton";
import { IoMdArrowRoundUp } from "react-icons/io";
import { scroller } from "react-scroll"
import ContactPill from "../../molecules/Contacts/ContactPill";
// import logo from "../../assets/Logo.svg"
import { schedule } from "./information.data.ts"

const FooterSection = () => {
  return (
    <motion.section className="w-full bg-primary py-16 md:py-24 px-4 snap-start snap-always">
      <motion.div className="max-w-[1104px] min-h-[600px] mx-auto text-base text-accent relative">
          <div className="flex flex-col md:flex-row md:flex-wrap gap-8 max-w-7xl min-h-[300px]">
            
            <div className="lg:block hidden">
              <div className="relative">
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-accent mb-4 text-nowrap">
                  Медицинский центр
                </h1>
                <img 
                  // src={logo} 
                  className="absolute top-1/2 left-1/4
                    scale-70 md:scale-100 lg:scale-125
                    -translate-x-16.5 md:-translate-x-9.5 lg:-translate-x-3
                    -translate-y-1.5 md:translate-y-2.5 lg:translate-y-6 z-10"
                  alt="Logo"
                />
              </div>
            </div>

            <div className="flex flex-col min-w-[170px] flex-1">
              <div className="font-semibold text-xl text-secondary mb-2">Информация</div>
              <div className="flex flex-col text-sm gap-2">
                {["Врачи", "Услуги", "Контакты"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col min-w-[200px] flex-2">
              <div className="font-semibold text-xl text-secondary mb-2">Часы работы</div>
              
              <div className="flex flex-col h-full text-sm gap-2">
                {schedule.map((day, index) => (
                  <motion.div 
                    key={day.name}
                    className="flex justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span>{day.name}</span>
                    <span>{day.hours}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col min-w-[220px] flex-2">
              <div className="font-semibold text-xl text-secondary mb-2">Контакты</div>
              <div className="flex flex-col gap-2 text-sm">
                {["г. Лиски, Воронежская область, ул. Титова, д. 20, помещение XI", "Остановка «ТРЦ Проспект»", "+ 7 (980) 244-44-00", "info@lavandamed.ru"].map((item, index) => (
                  <motion.div
                    key={item}
                    className={
                      index === 2 ? "md:block hidden mt-2" : 
                      index === 3 ? "md:block hidden" : 
                      ""
                    }
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            className="flex flex-col gap-4 max-w-7xl mx-auto mt-8 pt-4 text-xs text-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="border-t border-accent w-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            <div className="flex flex-row justify-between min-h-[110px]">
              <div className="lg:block hidden max-w-1/2">
                <div className="flex flex-col gap-4">
                  <p>Наша компания открыта для новых клиентов, мы ведем все современные социальные сети и мессенджеры.</p>
                  <p>Вы можете написать нам любым удобным для вас способом - телефон, почта, мессенджеры или социальные сети.</p>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 w-full">
                <ContactPill displayText={false} displayAddress={false} />
              </div>
            </div>

            <div className="flex flex-row justify-between text-nowrap item-center mt-5">
              <span className="text-xl md:text-2xl text-secondary">© lavandamed.ru, 2026</span>

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
                    scale: [1, 1.1, 1.05, 1.1, 1]
                  }}
                  transition={{
                    delay: 2,
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                >
                  <IconButton
                    icon={IoMdArrowRoundUp}
                    className="text-accent !rounded-full !p-[8px]"
                    side="only"
                    onClick={() => {
                      scroller.scrollTo("home", {
                        duration: 2000,
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
  )
}

export default FooterSection