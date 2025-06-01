import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "/src/components/security/AuthContext";

export default function RequireAuth({ children }) {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	return isAuthenticated ? children : <Navigate to="/signup-login" replace state={{ path: location.pathname }} />
}