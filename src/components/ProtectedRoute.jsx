import {Navigate} from "react-router-dom";
import {Toast} from "./Toast";


const ProtectedRoute = ({token, allowed, children}) => {
debugger;
    if (!token) {
        Toast("error", "Необхідно авторизуватись")
        return (
            <Navigate to="/login" replace/>
        );
    }

    if (!token || !allowed) {
        Toast("error", "Недостатньо прав")
        return <Navigate to="/" replace/>;
    }

    return children;
};

export default ProtectedRoute;