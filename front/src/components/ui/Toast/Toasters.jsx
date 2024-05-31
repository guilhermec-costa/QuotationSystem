import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const notifySuccess = (message, opts = {}) => {
    toast.success(message, { ...opts });
}

const notifyError = (message, opts = {}) => {
    toast.error(message, { ...opts });
}

const notifyWarning = (message, opts = {}) => {
    toast.warning(message, { ...opts });
}

const notifyInfo = (message, opts = {}) => {
    toast.info(message, { ...opts });
}

export {
    notifySuccess,
    notifyInfo,
    notifyWarning,
    notifyError
}
