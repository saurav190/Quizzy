import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedPages= ({ children }) => {
  const {isAuthenticated} = useSelector((state)=> state.userSlice);
  // const isAuthenticated = userAuthItem ? JSON.parse(userAuthItem) : false;
  const location = useLocation();
  console.log(location);
  console.log(isAuthenticated);

  return <>{isAuthenticated === false ? <Navigate to={`/login?redirect=${location.pathname}`} /> : children}</>;
};

export default ProtectedPages;
