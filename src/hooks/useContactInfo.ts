import { useContext } from "react";
import { ContactInfoContext } from "../context/ContactInfoContext";

const useContactInfo = () => useContext(ContactInfoContext);

export default useContactInfo;
