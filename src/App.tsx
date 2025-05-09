import { useState } from "react";
import Header from "./components/Header";
import ListView from "./components/ListView";
import MapView from "./components/MapView";
import ViewToggleButton from "./components/ViewToggleButton";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [isList, setIsList] = useState(true)

  function toggleView() {
    setIsList(!isList);
  }

  return (
    <>
      <Header />
      <main>
        {
          isList ?
            <><ListView /> <ViewToggleButton isList={true} buttonClick={toggleView} /></> :
            <><MapView /><ViewToggleButton isList={false} buttonClick={toggleView} /></>
        }
      </main>
      {isList && <Footer />}
    </>
  )
}

export default App
