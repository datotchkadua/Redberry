import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, validation }) => {
  
 
  if (!validation) {
    return <Navigate to="/" />;
  } else return children;
};
export default ProtectedRoute;
