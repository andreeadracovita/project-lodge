import { useState } from 'react'
import Header from './components/Header'
import ListView from './components/ListView'
import MapView from './components/MapView'
import Footer from './components/Footer'

function App() {
  const [isList, setIsList] = useState(true)

  return (
    <>
      <Header />
      {isList ? <ListView /> : <MapView />}
      {isList && <Footer />}
    </>
  )
}

export default App
