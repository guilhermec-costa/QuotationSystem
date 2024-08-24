import { Navigate } from "react-router-dom"

const PrivateRouter = ({ children }) => {
    const user = localStorage.getItem("userData");
    const isUserValid = !!JSON.parse(user);

    if (!isUserValid) return <Navigate to={"/auth"} />
    return children;
}

export default PrivateRouter;
