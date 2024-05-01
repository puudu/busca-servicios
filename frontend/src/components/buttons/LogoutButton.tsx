import axios from "axios";
import { useUser } from "../../context/userContext";
import toast from "react-hot-toast";

type Props = {
  className: string;
};

const LogoutButton = ({ className }: Props) => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    console.log("hola");
    try {
      await axios.get(import.meta.env.VITE_API_URL + "/users/logout");
      localStorage.removeItem("token");
      setUser(null);
      window.location.reload();
      toast.success("Tu sesión se ha cerrado correctamente.");
    } catch (err) {
      console.log("Error al cerrar sesión: ", err);
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
