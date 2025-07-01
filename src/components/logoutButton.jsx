import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

function LogoutButton(){
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/")
    }


    return(
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Cerrar sesion
        </button>
    )
}
export default LogoutButton