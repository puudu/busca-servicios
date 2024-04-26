import axios from "axios";
import React, { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/users/login",
        { email, password }
      );
      const { token } = res.data;
      localStorage.setItem("token", token); // Almacena el token JWT en localStorage
      // Redirige a la página principal o realiza alguna acción después de iniciar sesión
      console.log("Has iniciado sesion, token: " + token);
      return navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-700 border border-slate-600 rounded-md p-2 mx-36 my-40"
    >
      <h2 className="text-center text-xl mb-4 text-slate-500">
        INICIAR SESIÓN
      </h2>
      <FormInput
        isRequired={true}
        label="Correo electronico"
        name="email"
        placeholder="ejemplo@mail.com"
        size={30}
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormInput
        isRequired={true}
        label="Contraseña"
        name="password"
        placeholder="********"
        size={30}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-slate-800 p-2 text-slate-400 rounded-md hover:bg-slate-600"
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
