import { Navigate } from "react-router-dom";

import { useAuth } from "/src/components/security/AuthContext";

export default function RequireAuth({ children }) {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? children : <Navigate to="/signuplogin" replace />
}