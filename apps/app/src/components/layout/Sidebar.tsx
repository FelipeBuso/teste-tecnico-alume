// src/components/layout/Sidebar.tsx
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/simulations", label: "Simulações" },
  { to: "/students", label: "Estudante" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 fixed left-0 top-0">
      <h2 className="text-xl font-bold mb-6">Financiamento</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-indigo-700 ${
                isActive ? "bg-indigo-600 font-semibold" : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
