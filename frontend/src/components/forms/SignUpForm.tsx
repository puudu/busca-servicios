import axios from "axios";
import React, { useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_API_URL + "/users/signup", {
        username,
        email,
        password,
        passwordConfirm,
        role: "user",
      });
      return navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al crear la cuenta:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-700 border border-slate-600 rounded-md p-2 mx-36 my-40"
    >
      <h2 className="text-center text-xl mb-4 text-slate-500">
        CREA UNA CUENTA
      </h2>
      <FormInput
        isRequired={true}
        label="Nombre de usuario"
        name="username"
        placeholder="username"
        size={30}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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

      <FormInput
        isRequired={true}
        label="Confirmar contraseña"
        name="passwordConfirm"
        placeholder="********"
        size={30}
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-slate-800 p-2 text-slate-400 rounded-md hover:bg-slate-600"
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
