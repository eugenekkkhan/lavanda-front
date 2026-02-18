import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import IconButton from "../../molecules/Buttons/IconButton";
import { contactsData } from "./contacts.data";

const ContactSection = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <span>Контакты</span>
          <span>Мы в социальных сетях:</span>
          <div className="flex flex-row">
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
          <span>Mail:</span>
          <span>Телефоны:</span>
          <span>Адрес:
          г. Лиски, Воронежская область, ул Титова д.20 помещение XI</span>
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