// src/components/layout/Header.tsx
import { useAuth } from "../../context/authContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-gray-400 shadow flex items-center justify-between px-6 ">
      <h1 className="text-lg font-semibold">{user?.nome}</h1>
      <div className="relative group">
        <button
          type="button"
          onClick={logout}
          className="font-medium text-sm cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
