import "./App.css";
import Stack from "./atoms/Stack/Stack";

function App() {
  return (
    <>
      <Stack direction="col">
        <div className="w-20 h-20 bg-amber-800">Penis</div>
        <div className="w-20 h-20 bg-pink-500">Penis2</div>
      </Stack>
    </>
  );
}

export default App;
