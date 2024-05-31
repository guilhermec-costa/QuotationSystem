import { ToastContainer } from "react-toastify"

const ToastProvider = () => {
    return (
        <ToastContainer
            className="w-[70%] lg:w-[20%]"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
        />
    )
}

export {
    ToastProvider
}
