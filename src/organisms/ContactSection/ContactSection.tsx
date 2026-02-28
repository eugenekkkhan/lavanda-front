import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import ContactPill from "../../molecules/Contacts/ContactPill";
import { motion } from 'framer-motion'

const ContactSection = () => {
  return (
    <motion.section className='w-full bg-secondary py-16 md:py-24 px-4'>
      <motion.div className='max-w-[1104px] mx-auto'>
        <div className="flex flex-col lg:flex-row justify-evenly gap-5">
          <div className="flex flex-col gap-[18px]">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Контакты
            </h2>
            <div className="hidden sm:block">
              <ContactPill displayAddress={true} displayText={true}/>
            </div>
            <div className="block sm:hidden">
              <ContactPill displayAddress={true} displayText={false}/>
            </div>
          </div>
          <div className="w-full lg:w-[641px] h-[520px] rounded-3xl overflow-hidden">
            <YMaps>
              <Map 
                defaultState={{ center: [50.985008, 39.480560], zoom: 16.5 }}
                className="w-full h-full"
              >
                <Placemark geometry={[50.985008, 39.480560]} options={{ 
                  iconColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() 
                }}/>
              </Map>
            </YMaps>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default ContactSection