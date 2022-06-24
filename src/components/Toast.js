import {toast} from "react-toastify"

export const Toast = (type, message) => {

    const options = {
        position: "top-right",
        autoClose: 5000,
        closeButton: false,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: true,
        newestOnTop: true
    }

    switch (type) {
        case "info":
            toast.info(message, options);
            break;
        case "success":
            toast.success(message, options);
            break;
        case "warning":
            toast.warning(message, options);
            break;
        case "error":
            toast.error(message, options);
            break;
        default:
            toast.info(message, options);
            break;
    }

};
