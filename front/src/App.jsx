import './App.css'
import { router } from './routes'
import { RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import Loading from './components/Loading'
import AppProvider from './hooks/AppProvider'
import { ToastProvider } from './components/ui'

function App() {
    return (
        <AppProvider>
            <Suspense fallback={<Loading />}>
                <RouterProvider router={router} />
            </Suspense>
            <ToastProvider />
        </AppProvider>
    )
}

export default App
