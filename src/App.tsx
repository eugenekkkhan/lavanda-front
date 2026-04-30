import { HelmetProvider } from "react-helmet-async";
import RouterComponent from "./RouterComponent";
import ContactInfoProvider from "./context/ContactInfoContext";

function App() {
  return (
    <HelmetProvider>
      <ContactInfoProvider>
        <RouterComponent />
      </ContactInfoProvider>
    </HelmetProvider>
  );
}

export default App;
