// src/components/layout/AppLayout.tsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex w-max flex-col flex-1 ">
        <Header />
        <main className="p-6 md:ml-50 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
