import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-indigo-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Menu</span>
      </div>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/penghuni"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`
          }
        >
          Penghuni
        </NavLink>
        <NavLink
          to="/rumah"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`
          }
        >
          Rumah
        </NavLink>
        <NavLink
          to="/pembayaran"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`
          }
        >
          Pembayaran
        </NavLink>
        <NavLink
          to="/pengeluaran"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
            }`
          }
        >
          Pengeluaran
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
