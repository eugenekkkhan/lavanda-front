import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import IconButton from "../../molecules/Buttons/IconButton";
import { contactsData } from "./contacts.data";
import { MdOutlineAlternateEmail } from "react-icons/md";
import TextButton from "../../molecules/Buttons/TextButton";

const ContactSection = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col gap-[15px]">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
            Контакты
          </h2>
          <div className="flex flex-col gap-[10px]">
            <span>Мы в социальных сетях:</span>
            <div className="flex flex-row w-[176px] justify-between">
              {contactsData.map((contact) => (
                <a
                  key={contact.id}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    icon={contact.icon}
                    className="rounded-full !p-[6px] !text-black border border-black border-solid"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <span>Mail:</span>
            <a href="mailto:info@lavandamed.ru">
              <IconButton 
                icon={MdOutlineAlternateEmail}
                className="flex flex-row !w-[230px] !p-[2px] !text-black border border-black border-solid"
              >
                info@lavandamed.ru
              </IconButton>
            </a>
          </div>

          <div className="flex flex-col gap-[10px]">
            <span>Телефоны:</span>
            <a href="tel:+79802444401">
              <TextButton 
                text="+ 7&nbsp;(980)&nbsp;244&#8209;44&#8209;01"
                className="!w-[205px] !p-[2px] !text-black border border-black border-solid"
              />
            </a>
            <a href="tel:+79802444400">
              <TextButton 
                text="+ 7&nbsp;(980)&nbsp;244&#8209;44&#8209;00"
                className="!w-[205px] !p-[2px] !text-black border border-black border-solid"
              />
            </a>
          </div>

          <div className="flex flex-col gap-[10px]">
            <span>Адрес:</span>
            <span>г. Лиски, Воронежская область,</span>
            <span>ул Титова д.20 помещение XI</span>
          </div>
        </div>
        <div className="w-[641px] h-[520px] rounded-3xl overflow-hidden">
          <YMaps>
            <Map 
              defaultState={{ center: [50.985008, 39.480560], zoom: 16.5 }}
              className="w-full h-full"
            >
              <Placemark geometry={[50.985008, 39.480560]} options={{ iconColor: "#bdb2ff" }}/>
            </Map>
          </YMaps>
        </div>
      </div>
    </section>
  )
}

export default ContactSection