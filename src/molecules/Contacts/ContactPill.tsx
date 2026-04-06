import React from "react";
import { motion } from "framer-motion";
import IconButton from "../../molecules/Buttons/IconButton";
import { contactsData } from "../../organisms/ContactSection/contacts.data";
import { MdOutlineAlternateEmail } from "react-icons/md";
import TextButton from "../../molecules/Buttons/TextButton";

interface ContactPillProps {
  displayText: boolean;
  displayAddress: boolean;
}

const ContactPill: React.FC<ContactPillProps> = ({
  displayText = false,
  displayAddress = false,
}) => {
  return (
    <motion.div
      className="bg-contactPill-primary rounded-[28px] text-contactPill-secondary p-2 overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-wrap items-center gap-2 w-full">
          <div className="flex gap-2 justify-start shrink-0">
            {contactsData.map((contact) => (
              <a
                key={contact.id}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton
                  side="only"
                  icon={contact.icon}
                  className="cursor-pointer rounded-full !p-[8px] 
                    !bg-contactPill-secondary !text-contactPill-primary !ring-contactPill-secondary"
                />
              </a>
            ))}
          </div>

          <div className="grow min-w-[200px]">
            <a href="mailto:info@lavandamed.ru" className="block w-full">
              <IconButton
                icon={MdOutlineAlternateEmail}
                size="base"
                className="cursor-pointer !rounded-[21px] !py-[10px] w-full justify-center items-center 
                  !bg-contactPill-secondary !text-contactPill-primary !ring-contactPill-secondary"
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
        <div className="flex flex-col mt-2 w-full">
          {displayText && <span className="mb-2">Телефоны:</span>}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full">
            <a href="tel:+79802444401" className="flex-1 w-full sm:w-auto">
              <TextButton
                text="+ 7 (980) 244-44-01"
                size="base"
                className="cursor-pointer !rounded-[21px] !py-[10px] w-full justify-center 
                  !bg-contactPill-secondary !text-contactPill-primary !ring-contactPill-secondary"
              />
            </a>
            <a href="tel:+79802444400" className="flex-1 w-full sm:w-auto">
              <TextButton
                text="+ 7 (980) 244-44-00"
                size="base"
                className="cursor-pointer !rounded-[21px] !py-[10px] w-full justify-center 
                  !bg-contactPill-secondary !text-contactPill-primary !ring-contactPill-secondary"
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
          <div className="flex flex-col mt-2 w-full">
            {displayText && <span className="mb-2">Адрес:</span>}
            <TextButton
              text="г. Лиски, Воронежская область, ул. Титова, д. 20, помещение XI"
              className="w-full justify-center cursor-default 
                !bg-contactPill-secondary !text-contactPill-primary !ring-contactPill-secondary"
              size="lg"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactPill;
