import { Navigate }
  from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";


const AdminRoute = ({
  children,
}) => {

  const { user } = useAuth();

  // Not admin
  if (
    !user ||
    user.role !== "admin"
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;