import { Outlet } from "react-router-dom";

// Components
import Sidebar from "../componet/Sidebar/Sidebar";

export const LayoutSidebar = () => {
  return (
    <section className="font-archivo">
      <div className="flex w-full">
        <aside className="sticky bottom-0 top-0 h-[100dvh] w-72">
          <Sidebar />
        </aside>
        <main className="w-full p-4">
          <Outlet />
        </main>
      </div>
    </section>
  );
};
