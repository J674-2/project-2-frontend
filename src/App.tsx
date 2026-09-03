import './App.css'
import Layout from './assets/components/Layout/Layout'
import PreviousOrders from './assets/components/pages/PreviousOrders'
import MakeAnOrder from './assets/components/pages/MakeAnOrder'
import {Routes, Route} from 'react-router'

function App() {

  return (
    <>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<PreviousOrders />} />
        <Route path='make-an-order' element={<MakeAnOrder />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
