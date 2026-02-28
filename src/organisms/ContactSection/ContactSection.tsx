import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import ContactPill from "../../molecules/Contacts/ContactPill";

const ContactSection = () => {
  return (
    <section className="w-full min-h-screen bg-white">
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col gap-[15px]">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
            Контакты
          </h2>
          <div className="hidden sm:block">
            <ContactPill displayAddress={true} displayText={true}/>
          </div>
          <div className="block sm:hidden">
            <ContactPill displayAddress={true} displayText={false}/>
          </div>
        </div>
        <div className="w-fit lg:w-[641px] h-[520px] rounded-3xl overflow-hidden">
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