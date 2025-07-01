import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setIsAdmin(userSnap.data().isAdmin === true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    if (user) {
      checkAdmin();
    }
  }, [user]);

  if (loading || (user && isAdmin === null)) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <div>No tienes permisos para acceder a esta página.</div>;

  return children;
}

export default ProtectedRoute;
