import RouterComponent from "./RouterComponent";
import ContactInfoProvider from "./context/ContactInfoContext";

function App() {
  return (
    <ContactInfoProvider>
      <RouterComponent />
    </ContactInfoProvider>
  );
}

export default App;
