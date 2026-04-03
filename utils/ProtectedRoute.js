import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, isLoggedIn, anonymous }) {
  const location = useLocation();

  if (!isLoggedIn && !anonymous) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isLoggedIn && anonymous) {
    return <Navigate to="/cards" />;
  }

  return children;
}