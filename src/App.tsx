import './App.css'
import Layout from './assets/components/layout/Layout'
import PreviousOrders from './assets/components/previousorders/PreviousOrders'
import MakeAnOrder from './assets/components/makeanorder/MakeAnOrder'
import {Routes, Route} from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PageProvider from './assets/providers/PageProvider'
import PreviousOrderInfoProvider from './assets/providers/PreviousOrderInfoProvider'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<PageProvider><PreviousOrderInfoProvider><PreviousOrders /></PreviousOrderInfoProvider></PageProvider>} />
          <Route path='make-an-order' element={<MakeAnOrder />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
