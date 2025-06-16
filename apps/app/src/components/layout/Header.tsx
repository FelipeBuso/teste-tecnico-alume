// src/components/layout/Header.tsx
import { useAuth } from "../../context/authContext";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-indigo-600 shadow flex items-center justify-end px-6">
      <div className="relative group">
        <button
          type="button"
          onClick={logout}
          className="font-medium text-sm text-white cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
