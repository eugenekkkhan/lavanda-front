import { motion } from "framer-motion";
import TextButton from "../../molecules/Buttons/TextButton";
import IconButton from "../../molecules/Buttons/IconButton";
import { IoMdArrowRoundUp } from "react-icons/io";
import { scroller } from "react-scroll"
import ContactPill from "../../molecules/Contacts/ContactPill";

const FooterSection = () => {
  return (
    <motion.section className="w-full bg-primary py-16 md:py-24 px-4 snap-start snap-always">
      <motion.div className="max-w-[1104px] min-h-[600px] mx-auto text-base text-accent relative">
          <div className="flex flex-wrap gap-8 max-w-7xl">
            
            <div className="md:block hidden">
              <div className="flex flex-col min-w-[200px] flex-1">
                <div className="font-bold text-xl">ЛАВАНДА</div>
                <div className="text-xl text-gray-600">МЕДИЦИНСКИЙ ЦЕНТР</div>
              </div>
            </div>

            <div className="flex flex-col min-w-[160px] flex-1">
              <div className="font-semibold text-xl text-secondary mb-2">ИНФОРМАЦИЯ</div>
              <div className="flex flex-col text-sm gap-2">
                <div>Врачи</div>
                <div>Услуги</div>
                <div>Контакты</div>
              </div>
            </div>

            <div className="flex flex-col min-w-[200px] flex-1">
              <div className="font-semibold text-xl text-secondary mb-2">ЧАСЫ РАБОТЫ</div>
              
              <div className="flex flex-col h-full">
                <div className="flex flex-col h-full text-sm gap-2">
                  <div className="flex justify-between">
                    <span>Понедельник</span>
                    <span>07:30–18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Вторник</span>
                    <span>07:30–18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Среда</span>
                    <span>07:30–18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Четверг</span>
                    <span>07:30–18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Пятница</span>
                    <span>07:30–18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Суббота</span>
                    <span>07:30–15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Воскресенье</span>
                    <span>07:30–15:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col min-w-[220px] flex-1">
              <div className="font-semibold text-xl text-secondary mb-2">КОНТАКТЫ</div>
              <div className="flex flex-col gap-2 text-sm">
                <div>г. Лиски, Воронежская область, ул. Титова, д. 20, помещение XI</div>
                <div>Остановка «ТРЦ Проспект»</div>
                <div className="mt-2">+ 7 (980) 244-44-00</div>
                <div>info@lavandamed.ru</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 max-w-7xl mx-auto mt-8 pt-4 border-t border-accent text-xs text-accent">

            <div className="flex flex-row justify-between">
              <div className="lg:block hidden max-w-1/2">
                <div className="flex flex-col gap-4">
                  <p>Наша компания открыта для новых клиентов, мы ведем все современные социальные сети и мессенджеры.</p>
                  <p>Вы можете написать нам любым удобным для вас способом - телефон, почта, мессенджеры или социальные сети.</p>
                </div>
              </div>
              <div className="mx-auto lg:mx-0">
                <ContactPill displayText={false} displayAddress={false} />
              </div>
            </div>
            
            <div className="flex flex-row justify-between text-nowrap item-center">
              <span className="text-2xl text-secondary">© lavandamed.ru, 2026</span>
               <a href="https://lavandamed.ru/privacy.php" className="sm:w-auto">
                  <TextButton
                    text="Политика конфиденциальности"
                    size="base"
                    className="!py-[10px] w-full justify-center"
                  />
                </a>
            </div>
          </div>

          <div className="absolute right-1/12 bottom-1/12 translate-x-40 -translate-y-1/2">
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
          </div>
      </motion.div>
    </motion.section>
  )
}

export default FooterSection