import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="bg-purple-500 py-0.5"></div>
      <div className="bg-slate-900 py-3 px-1 flex justify-between">
        <div>
          <NavLink
            className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md"
            to={"/services"}
          >
            Busca un servicio
          </NavLink>
          <NavLink
            className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md"
            to={"/services/create"}
          >
            Publica un servicio
          </NavLink>
        </div>
        <div>
          <NavLink
            className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md"
            to={"/profile"}
          >
            Copito
          </NavLink>
          <NavLink
            className="text-slate-300 m-1 p-1.5 hover:text-slate-100 hover:bg-slate-700 rounded-md"
            to={"/logout"}
          >
            Cerrar sesion
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
