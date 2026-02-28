import React from 'react'
import { motion } from 'framer-motion'
import IconButton from "../../molecules/Buttons/IconButton";
import { contactsData } from "../../organisms/ContactSection/contacts.data";
import { MdOutlineAlternateEmail } from "react-icons/md";
import TextButton from "../../molecules/Buttons/TextButton";

interface ContactPillProps {
  displayText: boolean,
  displayAddress: boolean,
}

const ContactPill: React.FC<ContactPillProps> = ({
  displayText = false,
  displayAddress = false
}) => {
  return (
    <motion.div 
      className="bg-purple-400 rounded-[21px] text-white p-4 overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-wrap items-center gap-3 w-full">
          <div className="flex gap-3 justify-start shrink-0">
            {contactsData.map((contact) => (
              <a key={contact.id} href={contact.href} target="_blank" rel="noopener noreferrer">
                <IconButton icon={contact.icon} className="rounded-full !p-[8px]" theme="primary" />
              </a>
            ))}
          </div>

          <div className="grow min-w-[200px]">
            <a href="mailto:info@lavandamed.ru" className="block w-full">
              <IconButton 
                icon={MdOutlineAlternateEmail} 
                className="cursor-pointer !p-[4px] w-full justify-center items-center" 
                theme="primary"
              >
                <span className="truncate">info@lavandamed.ru</span>
              </IconButton>
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex flex-col mt-3 w-full">
          {displayText && <span className="mb-2">Телефоны:</span>}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 w-full">
            <a href="tel:+79802444401" className="flex-1 w-full sm:w-auto">
              <TextButton 
                text="+ 7&nbsp;(980)&nbsp;244&#8209;44&#8209;01" 
                className="cursor-pointer !p-[4px] w-full justify-center" 
                theme="primary" 
              />
            </a>
            <a href="tel:+79802444400" className="flex-1 w-full sm:w-auto">
              <TextButton 
                text="+ 7&nbsp;(980)&nbsp;244&#8209;44&#8209;00" 
                className="cursor-pointer !p-[4px] w-full justify-center" 
                theme="primary" 
              />
            </a>
          </div>
        </div>
      </motion.div>

      {displayAddress && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex flex-col mt-3 w-full">
            {displayText && <span className="mb-2">Адрес:</span>}
            <TextButton 
              text="г. Лиски, Воронежская область, ул Титова д. 20 помещение XI"
              theme="primary"
              className="w-full justify-center"
              size="lg"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactPill;